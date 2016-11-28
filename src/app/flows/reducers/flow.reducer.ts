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

    case FlowActions.LOAD_FLOW: {
      let _flow: Flow = {
        id: "1",
        name: 'First flow',
        description: "This is a mocked flow object.",
        steps: [
          { id: "1", "position": 0 },
          { id: "2", "position": 1, 
            service: {
              name: 'RSS',
              group: 'DKT native app',
              description: 'RSS service steps.',
              'icon': 'rss_feed',
            },
            serviceStep: { 
              id: '1',
              name: 'New item in RSS feed',
              description: 'Triggers on new RSS feed items.',
              type: 'trigger',
            }
          }
        ]
      }
  
      return Object.assign({}, state, {
        flow: _flow
      });
    }

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
