import { Directive, Input } from '@angular/core';
import { Validator, Validators, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import {Observable} from 'rxjs/Observable';

type asyncValidatorFn = (inputValue: any) => null | Promise<{[validatorKey: string]: any}>|Observable<{[validatorKey: string]: any}>;

@Directive({
  selector: '[esValidatorAsyncMulti][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: EsValidatorAsyncMultiDirective, multi: true }
  ]
})
export class EsValidatorAsyncMultiDirective implements Validator {

  @Input() esValidatorAsyncMulti: asyncValidatorFn[];

  constructor() {
  }

  validate(control: AbstractControl) {
    // Check if async multi validators are not provided and return Observable of null
    if (!this.esValidatorAsyncMulti || (this.esValidatorAsyncMulti && !this.esValidatorAsyncMulti.length)) {
      return new Observable(observer => {
        observer.next(null);
        setTimeout(function () {
          observer.complete();
        });
      });
    }
    // Merge all async validator functions in the input array into one error object or null
    const mergedAsyncValidators = Validators.composeAsync(this.esValidatorAsyncMulti);
    return mergedAsyncValidators(control.value);
  }

}
