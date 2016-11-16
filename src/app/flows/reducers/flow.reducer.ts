/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { Selector } from '../../core';
import { AppState } from '../../reducers';
import { FlowActions } from '../actions';
import { Flow, Step } from '../models';

export interface FlowState {
  flow: Flow;
  // loading: boolean;
  // loaded: boolean;
};

const initialState: FlowState = {
  flow: { 
    id: 0,
    name: '',
    description: '',
    steps: [],
  },
  // loading: false,
  // loaded: true,
};

export function flowReducer(state = initialState, action: Action): FlowState {
  switch (action.type) {

    case FlowActions.LOAD_FLOW: {
      let _flow: Flow = {
        id: 1,
        name: 'First flow',
        description: "This is a mocked flow object.",
        steps: [
          { id: 1 },
          { id: 2, 
            service: {
              name: 'RSS',
              icon: 'rss_feed',
              step: {
                name: 'New item in feed'
              }
            }
          }
        ]
      }
  
      let newState: FlowState = {
        flow: _flow
      }

      return newState;
    }

    default: {
      return state;
    }
  }
}

export function getCurrentFlow(): Selector<AppState,Flow> {
  return state$ => state$
    .map((state) => {
      console.log('STATE', state)
      return state.flow.flow
    })
    .distinctUntilChanged();
}

export function getCurrentStep(): Selector<AppState,Step> {
  // MOCK
  return state$ => state$
    .map(state => state.flow.flow.steps[0])
    .distinctUntilChanged();
}
