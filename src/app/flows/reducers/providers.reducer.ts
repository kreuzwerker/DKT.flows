/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';

import { AppState, Selector } from '../../reducers';
import { ProvidersActions } from '../actions';
import { Provider } from '../models';

export interface ProvidersState {
  providers: Provider[];
  loading: boolean;
  loaded: boolean;
};

const initialState: ProvidersState = {
  providers: [],
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
        providers: action.payload.providers,
        loading: false,
        loaded: true
      });

    case ProvidersActions.FETCH_PROVIDERS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        loaded: false
      });

    case ProvidersActions.SELECT_PROVIDER: {
      return Object.assign({}, state,
        {
          providers: state.providers.map((provider, index) => {
            return Object.assign({}, provider, {
              selected: (provider === action.payload ? true : false)
            });
          })
        }
      );
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

export function getProviders(): Selector<AppState, Provider[]> {
  return state$ => state$
    .map(state => state.providers.providers)
    .distinctUntilChanged();
}

export function getCurrentProvider(): Selector<AppState, Provider> {
  // See http://stackoverflow.com/questions/40720535/get-the-current-selected-item-or-null-from-item-list
  // 
  return state$ => state$
    .let(getProviders())
    .map((providers) => {
      let selectedProviders = providers.filter(provider => provider.selected);
      return selectedProviders.length ? selectedProviders : [null];
    })
    .flatMap(provider => provider)
    .distinctUntilChanged();
}
