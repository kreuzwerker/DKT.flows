/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { Selector } from '../../core';
import { AppState } from '../../reducers';
import { ServicesActions } from '../actions';
import { Service } from '../models';

export interface ServicesState {
  services: Service[];
  // loading: boolean;
  // loaded: boolean;
};

const initialState: ServicesState = {
  services: [],
  // loading: false,
  // loaded: true,
};

export function servicesReducer(state = initialState, action: Action): ServicesState {
  switch (action.type) {

    case ServicesActions.LOAD_SERVICES_SUCCESS: {
      return Object.assign({}, state, {
        services: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export function getServices(): Selector<AppState,Service[]> {
  return state$ => state$
    .map(state => state.services.services)
    .distinctUntilChanged();
}
