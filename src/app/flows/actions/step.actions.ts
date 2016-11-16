/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Step, Service, ServiceStep } from '../models';

@Injectable()
export class StepActions {
  static SELECT_STEP = 'SELECT_STEP';
  selectStep(step: Step): Action {
    return {
      type: StepActions.SELECT_STEP,
      payload: step
    };
  }

  static SET_STEP_SERVICE_STEP = 'SET_STEP_SERVICE_STEP';
  setStepServiceStep(service: Service, serviceStep: ServiceStep): Action {
    return {
      type: StepActions.SET_STEP_SERVICE_STEP,
      payload: {
        service: service,
        serviceStep: serviceStep,
      }
    };
  }
}
