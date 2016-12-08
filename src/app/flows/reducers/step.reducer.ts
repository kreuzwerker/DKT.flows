/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { AppState, Selector } from '../../reducers';
import { StepActions } from '../actions';
import { Step, Service } from '../models';

export interface StepState {
  step: Step;
  saving: boolean;
  saved: boolean;
};

const initialState: StepState = {
  step: { 
    id: "0",
    position: 0,
    service: null
  },
  saving: false,
  saved: true
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
          provider: action.payload.provider,
          service: action.payload.service
        }) 
      });
    }

    /*
      Save flow step
    */

    case StepActions.SAVE_STEP:
      return Object.assign({}, state, {
        saving: true,
        saved: false
      });

    case StepActions.UPDATE_STEP_SUCCESS:
      return Object.assign({}, state, {
        flow: action.payload.flow,
        saving: false,
        saved: true
      });

    case StepActions.UPDATE_STEP_FAILED:
      return Object.assign({}, state, {
        saving: false,
        saved: false
      });

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
