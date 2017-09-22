import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DemoService {

  constructor() { }

  getMember(userInput: string) {

    const aTeam = ['al', 'alex', 'lisa', 'frank', 'dominik.b', 'dominik.s', 'sebastian', 'samuel'];

    return new Observable(observer => {

      if (aTeam.indexOf(userInput.toLowerCase().trim()) === -1) {
        observer.next({notDeveloper: true});

        setTimeout(function () {
          observer.complete();
        }, 500);
      } else {
        observer.next(null);

        setTimeout(function () {
          observer.complete();
        }, 500);
      }
    });
  }

  isAlreadyLegend(userInput: string) {
    const legends = ['messi', 'ronaldo', 'pele', 'beckernbau', 'raul'];

    return new Observable(observer => {
      if (legends.indexOf(userInput.toLowerCase().trim()) >= 0) {
        observer.next({alreadyLegend: true});

        setTimeout(function () {
          observer.complete();
        }, 500);
      } else {
        observer.next(null);

        setTimeout(function () {
          observer.complete();
        }, 500);
      }
    });
  }
}
