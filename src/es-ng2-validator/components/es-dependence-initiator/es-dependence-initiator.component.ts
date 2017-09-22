import {
  Component, QueryList, ContentChildren, AfterContentInit, OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { EsDependentValidatorDirective } from '../../directives/es-dependent-validator/es-dependent-validator.directive';

@Component({
  selector: '[es-dependence-initiator]',
  template: '<ng-content></ng-content>',
  providers: [EsDependentValidatorDirective]
})
export class EsDependenceInitiatorComponent implements AfterContentInit, OnDestroy {
  _dependantsInputNamesAndValidators = [];
  _dependantsSubscribers = [];
  _dVErrorKey = [];
  @ContentChildren(EsDependentValidatorDirective) dependentValidators: QueryList<EsDependentValidatorDirective>;

  constructor(private form: NgForm) {
  }

  ngAfterContentInit() {
    this.subscribeToDependentInputChanges();
    this.dependentValidatorsListChangeSubscriber();
  }

  unsubscribeDependantChanges() {
    if (this._dependantsSubscribers.length) {
      for (let i = 0; i < this._dependantsSubscribers.length; i++) {
        if (typeof this._dependantsSubscribers[i] === 'function') {
          this._dependantsSubscribers[i].unsubscribe();
        }
      }
    }
  }


  getDependentErrorOnInputModelChange(collectedInputsAndValidators, inputName, currentInputValue) {
    let newValidatorError = null;
    if (collectedInputsAndValidators.length) {
      collectedInputsAndValidators.map(function (inputObj) {
        if (inputObj.inputName === inputName) {
          newValidatorError = inputObj['validator'](currentInputValue);
        }
      });
      if (newValidatorError && Object.keys(newValidatorError).length) {
        for (const errKey in newValidatorError) {
          if (errKey) {
            if (errKey !== this._dVErrorKey[0]) {
              this._dVErrorKey.push(errKey);
            }
          }
        }
      }
    }
    return newValidatorError;
  }


  subscribeToDependentInputChanges() {
    const that = this;

    this.unsubscribeDependantChanges();

    this._dependantsInputNamesAndValidators = [];

    this.dependentValidators.forEach(dependentInstance => {
      setTimeout(function () {

        if (dependentInstance['ngModel'] && dependentInstance['esDependentValidator']) {
          const formInputName = dependentInstance['ngModel'].name;
          const formInputValue = dependentInstance['ngModel'].model;
          const validatorObject = {
            inputName: dependentInstance['ngModel'].name,
            validator: dependentInstance['esDependentValidator']
          };
          that._dependantsInputNamesAndValidators.push(validatorObject);
          const initError = that.getDependentErrorOnInputModelChange(that._dependantsInputNamesAndValidators, formInputName, formInputValue);
          that.setDependentInputsValidity(initError);
          that.setDependentInputControlSubscriber(formInputName);
        }
      }, 0);
    });
  }

  dependentValidatorsListChangeSubscriber() {
    this.dependentValidators.changes.subscribe(newList => this.subscribeToDependentInputChanges());
  }

  setDependentInputControlSubscriber(inputControlName) {

    const controlSubscriber = this.form.controls[inputControlName].valueChanges.subscribe(newInputValue => {
      const currentError = this.getDependentErrorOnInputModelChange(this._dependantsInputNamesAndValidators, inputControlName, newInputValue);

      this.setDependentInputsValidity(currentError);
    });

    this._dependantsSubscribers.push(controlSubscriber);
  }

  setDependentInputsValidity(newError) {
    const that = this;
    if (this._dependantsInputNamesAndValidators.length > 0) {
      this._dependantsInputNamesAndValidators.map(function (dependant) {
        let errors = null;
        const existingControlErr = that.form.controls[dependant['inputName']].errors;
        if (existingControlErr) {
          errors = existingControlErr;
          if (newError) {
            errors = Object.assign(errors, newError);
          }
        } else if (newError) {
          errors = newError;
        }

        if (!newError && existingControlErr && that._dVErrorKey.length) {
          if (existingControlErr.hasOwnProperty(that._dVErrorKey[0])) {
            delete existingControlErr[that._dVErrorKey[0]];
            if (!Object.keys(existingControlErr).length) {
              errors = null;
            }
          }
        }
        // console.log(index, dependant['inputName'], errors);
        that.form.controls[dependant['inputName']].setErrors(errors);
      });
    }
  }

  ngOnDestroy() {
  }

}
