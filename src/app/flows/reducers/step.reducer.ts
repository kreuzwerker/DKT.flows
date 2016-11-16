/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { Selector } from '../../core';
import { AppState } from '../../reducers';
import { StepActions } from '../actions';
import { Step, ServiceStep } from '../models';

export interface StepState {
  step: Step;
};

const initialState: StepState = {
  step: { 
    id: "0",
    serviceStep: null
  },
};

export function stepReducer(state = initialState, action: Action): StepState {
  switch (action.type) {

    case StepActions.SELECT_STEP: {
      return Object.assign({}, state, {
        step: action.payload
      });
    }

    case StepActions.SET_STEP_SERVICE_STEP: {
      return Object.assign({}, state, { 
        step: Object.assign({}, state.step, {
          service: action.payload.service,
          serviceStep: action.payload.serviceStep
        }) 
      });
    }

    default: {
      return state;
    }
  }
}

export function getCurrentStep(): Selector<AppState,Step> {
  return state$ => state$
    .map(state => state.step.step)
    .distinctUntilChanged();
}
