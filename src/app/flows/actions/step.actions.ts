/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Step, StepData, Provider, Service } from '../models';

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
  setStepService(provider: Provider, service: Service): Action {
    return {
      type: StepActions.SET_STEP_SERVICE_STEP,
      payload: {
        provider: provider,
        service: service,
      }
    };
  }

  /*
    Update step
  */

  static SAVE_STEP = 'SAVE_STEP';
  saveStep(flowId: string, stepId: string, step: StepData): Action {
    return {
      type: StepActions.SAVE_STEP,
      payload: {
        flowId: flowId,
        stepId: stepId,
        step: step
      }
    };
  }

  static UPDATE_STEP_SUCCESS = 'UPDATE_STEP_SUCCESS';
  updateStepFulfilled(step: StepData): Action {
    return {
      type: StepActions.UPDATE_STEP_SUCCESS,
      payload: {
        step: step
      }
    };
  }

  static UPDATE_STEP_FAILED = 'UPDATE_STEP_FAILED';
  updateStepFailed(error: any): Action {
    return {
      type: StepActions.UPDATE_STEP_FAILED,
      payload: error
    };
  }
}
