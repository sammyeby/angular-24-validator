import {Component, AfterViewInit } from '@angular/core';
import { DemoService } from './services/demo.service';

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DemoService],
})
export class AppComponent implements AfterViewInit {
  title = 'ES-NG2-VALIDATOR Demo ==> Angular (4)';
  subTitle = 'Angular Custom Validator Module';

  demoModel = {
    single: '',
    multi: 'Test multi',
    dependants: {
      one: '',
      two: '',
      three: ''
    },
    async: '',
    asyncMulti: 'Test Async multi'
  };

  addNewInput = false;

  // This assignment is for the service call to get the correct context
  checkDeveloperAsyncFn = this.dS.getMember;
  checkIfLegendAsyncFn = this.dS.isAlreadyLegend;

  constructor(private dS: DemoService) {
  }

  checkLength (inputValue: any) {
    if (inputValue && inputValue.length >= 5) {
      return null;
    }
    return {checkLength: true};
  }
  isValidString (inputValue: string) {
    if (inputValue && inputValue === 'validator') {
      return null;
    }
    return {inValidString: true};
  }

  validateDependentInputs(inputValue: string) {
    if ((this.demoModel.dependants.one.length + this.demoModel.dependants.two.length + this.demoModel.dependants.three.length) === 10) {
      return null;
    }
    return {dependentValidator: true};
  }

  toggleInput() {
    this.addNewInput = !this.addNewInput;
    if (!this.addNewInput) {
      this.demoModel.dependants.three = '';
    }
  }
  ngAfterViewInit() {
  }
}
