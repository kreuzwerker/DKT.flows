/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';
import 'rxjs/add/operator/startWith';

import { AppState, Selector } from '../../reducers';
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

    case ServicesActions.SELECT_SERVICE: {
      return Object.assign({}, state,
        {
          services: state.services.map((service, index) => {
            return Object.assign({}, service, {
              selected: (service === action.payload ? true : false)
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

export function getServices(): Selector<AppState,Service[]> {
  return state$ => state$
    .map(state => state.services.services)
    .distinctUntilChanged();
}

export function getCurrentService(): Selector<AppState,Service> {
  // See http://stackoverflow.com/questions/40720535/get-the-current-selected-item-or-null-from-item-list
  return state$ => state$
    .let(getServices())
    .map((services) => {
      let selectedServices = services.filter(service => service.selected)
      return selectedServices.length ? selectedServices : [null];
    })
    .flatMap(service => service)
    .distinctUntilChanged()
}
