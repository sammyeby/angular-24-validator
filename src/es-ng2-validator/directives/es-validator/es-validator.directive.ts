import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';


type validatorFunction = (inputValue: any) => null | {[validatorKey: string]: any};

@Directive({
  selector: '[esValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EsValidatorDirective, multi: true }
  ]
})
export class EsValidatorDirective implements Validator {

  @Input() esValidator: validatorFunction;

  constructor() {}

  validate(control: AbstractControl): { [validatorKey: string]: any } {
    // Check if validator function is not provided and return null
    if (!this.esValidator) {
      return null;
    }
    return this.esValidator(control.value);
  }

}
