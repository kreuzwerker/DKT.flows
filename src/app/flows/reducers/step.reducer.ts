/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { StepActions } from '../actions/step.actions';
import { Step } from '../models/step.model';

export interface StepState {
  step: Step;
};

const initialState: StepState = {
  step: { 
    id: 0,
    service: null
  },
};

export function stepReducer(state = initialState, action: Action): StepState {
  switch (action.type) {

    case StepActions.SELECT_STEP: {
      return Object.assign({}, state, {
        step: action.payload
      });
    }

    case StepActions.SET_STEP_SERVICE: {
      // TODO state.step.service = payload
      return Object.assign({}, state, {
        service: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

