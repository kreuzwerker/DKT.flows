/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { StepActions } from '../actions/step.actions';
import { Step } from '../models/step.model';

export interface StepState {
  step: Step;
  // loading: boolean;
  // loaded: boolean;
};

const initialState: StepState = {
  step: { 
    id: 0
  },
  // loading: false,
  // loaded: true,
};

export function stepReducer(state = initialState, action: Action): StepState {
  switch (action.type) {

    case StepActions.SET_SERVICE: {
      return Object.assign({}, state, {
        service: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

