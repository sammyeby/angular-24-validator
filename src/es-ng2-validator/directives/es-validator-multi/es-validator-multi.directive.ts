import { Directive, Input } from '@angular/core';
import { Validator, Validators, AbstractControl, NG_VALIDATORS } from '@angular/forms';

type validatorFunction = (inputValue: any) => null | {[validatorKey: string]: any};

@Directive({
  selector: '[esValidatorMulti][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EsValidatorMultiDirective, multi: true }
  ]
})
export class EsValidatorMultiDirective implements Validator {

  @Input() esValidatorMulti: validatorFunction[];

  constructor() {
  }
  validate(control: AbstractControl): {[validatorKey: string]: any} {
    if (!this.esValidatorMulti || (this.esValidatorMulti && !this.esValidatorMulti.length)) {
      return null;
    }
    // Merge all validator functions in the input array into one error object or null
    const mergedValidators = Validators.compose(this.esValidatorMulti);
    return mergedValidators(control.value);
  }

}
