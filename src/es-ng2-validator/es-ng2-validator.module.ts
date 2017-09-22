import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsValidatorDirective } from './directives/es-validator/es-validator.directive';
import { EsValidatorAsyncDirective } from './directives/es-validator-async/es-validator-async.directive';
import { EsValidatorMultiDirective } from './directives/es-validator-multi/es-validator-multi.directive';
import { EsValidatorAsyncMultiDirective } from './directives/es-validator-async-multi/es-validator-async-multi.directive';
import { EsDependentValidatorDirective } from './directives/es-dependent-validator/es-dependent-validator.directive';

import { EsDependenceInitiatorComponent } from './components/es-dependence-initiator/es-dependence-initiator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EsValidatorDirective,
    EsValidatorAsyncDirective,
    EsValidatorMultiDirective,
    EsValidatorAsyncMultiDirective,
    EsDependentValidatorDirective,
    EsDependenceInitiatorComponent
  ],
  exports: [
    EsValidatorDirective,
    EsValidatorAsyncDirective,
    EsValidatorMultiDirective,
    EsValidatorAsyncMultiDirective,
    EsDependentValidatorDirective,
    EsDependenceInitiatorComponent
  ]
})
export class EsNg2ValidatorModule { }
