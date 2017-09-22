import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS } from '@angular/forms';
import {Observable} from 'rxjs/Observable';


type asyncValidatorFunction = (inputValue: any) => null | Promise<{[validatorKey: string]: any}>|Observable<{[validatorKey: string]: any}>;

@Directive({
  selector: '[esValidatorAsync][ngModel]',
  providers: [
    { provide: NG_ASYNC_VALIDATORS, useExisting: EsValidatorAsyncDirective, multi: true }
  ]
})
export class EsValidatorAsyncDirective implements Validator {

  @Input() esValidatorAsync: asyncValidatorFunction;

  constructor() {}

  validate(control: AbstractControl): Promise<{[validatorKey: string]: any}> | Observable<{[validatorKey: string]: any}> {
    // Check if async validator function is not provided and return Observable of null
    if (!this.esValidatorAsync) {
      return new Observable(observer => {
        observer.next(null);
        setTimeout(function () {
          observer.complete();
        });
      });
    }
    return this.esValidatorAsync(control.value);
  }

}
