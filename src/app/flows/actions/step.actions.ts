/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Service } from '../models';

@Injectable()
export class StepActions {

  static SET_SERVICE = 'SET_SERVICE';
  setService(service: Service): Action {
    return {
      type: StepActions.SET_SERVICE,
      payload: service
    };
  }
}
