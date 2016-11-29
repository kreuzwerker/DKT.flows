/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { AppState, Selector } from '../../reducers';
import { FlowActions } from '../actions';
import { Flow, Step } from '../models';

export interface FlowState {
  flow: Flow;
  // loading: boolean;
  // loaded: boolean;
};

const initialState: FlowState = {
  flow: { 
    id: "0",
    name: '',
    description: '',
    steps: [],
  },
  // loading: false,
  // loaded: true,
};

export function flowReducer(state = initialState, action: Action): FlowState {
  switch (action.type) {
    case FlowActions.FETCH_FLOW_FULFILLED:
      return Object.assign({}, state, {
        flow: action.payload.flow
      });

    default: {
      return state;
    }
  }
}

export function getCurrentFlow(): Selector<AppState,Flow> {
  return state$ => state$
    .map((state) => {
      return state.flow.flow
    })
    .distinctUntilChanged();
}
