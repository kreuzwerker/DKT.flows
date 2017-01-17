/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';

import { AppState, Selector } from '../../reducers';
import { ProvidersActions } from '../actions';
import { Provider } from '../models';

export interface ProvidersState {
  provider: Provider;
  loading: boolean;
  loaded: boolean;
};

const initialState: ProvidersState = {
  provider: null,
  loading: false,
  loaded: true,
};

export function providersReducer(state = initialState, action: Action): ProvidersState {
  switch (action.type) {
    case ProvidersActions.LOAD_PROVIDERS:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });

    case ProvidersActions.FETCH_PROVIDERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true
      });

    case ProvidersActions.FETCH_PROVIDERS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loaded: false
      });

    case ProvidersActions.SELECT_PROVIDER: {
      return Object.assign({}, state, {
        provider: action.payload
      });
    }

    default: {
      return state;
    }
  }
}

export function isLoadingProviders(): Selector<AppState, Boolean> {
  return state$ => state$
    .map(state => state.providers.loading)
    .distinctUntilChanged();
}

export function getCurrentProvider(): Selector<AppState, Provider> {
  return state$ => state$
    .map(state => state.providers.provider)
    .distinctUntilChanged();
}
