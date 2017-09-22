import { Directive, Input, Optional } from '@angular/core';
import { NgModel } from '@angular/forms';

export type validatorFunction = (inputValue: any) => null | {[validatorKey: string]: any};

@Directive({
  selector: '[esDependentValidator][ngModel]',
  providers: [NgModel]
})
export class EsDependentValidatorDirective {

  @Input() esDependentValidator: validatorFunction;

  constructor(@Optional() private ngModel: NgModel) {
    // console.log();
  }

}
