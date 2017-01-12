/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { AppState, Selector } from '../../reducers';
import { FlowActions } from '../actions';
import { Flow, Step } from '../models';

export interface FlowState {
  flow: Flow;
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  saved: boolean;
};

const initialState: FlowState = {
  flow: {
    id: '0',
    name: '',
    description: '',
    steps: [],
  },
  loading: false,
  loaded: false,
  saving: false,
  saved: true
};

export function flowReducer(state = initialState, action: Action): FlowState {
  switch (action.type) {

    /*
      Load flow
    */

    case FlowActions.LOAD_FLOW:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });

    case FlowActions.FETCH_FLOW_SUCCESS:
      return Object.assign({}, state, {
        flow: action.payload.flow,
        loading: false,
        loaded: true
      });

    case FlowActions.FETCH_FLOW_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loaded: false
      });

    /*
      Save flow
    */

    case FlowActions.SAVE_FLOW:
      return Object.assign({}, state, {
        saving: true,
        saved: false
      });

    case FlowActions.UPDATE_FLOW_SUCCESS:
      return Object.assign({}, state, {
        flow: action.payload.flow,
        saving: false,
        saved: true
      });

    case FlowActions.UPDATE_FLOW_FAILED:
      return Object.assign({}, state, {
        saving: false,
        saved: false
      });

    default: {
      return state;
    }
  }
}

export function isLoadingFlow(): Selector<AppState, Boolean> {
  return state$ => state$
    .map(state => state.flow.loading)
    .distinctUntilChanged();
}

export function getCurrentFlow(): Selector<AppState, Flow> {
  return state$ => state$
    .map((state) => {
      return state.flow.flow;
    })
    .distinctUntilChanged();
}
