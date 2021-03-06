import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';

import { routerReducer } from '@angular-redux/router';
import { client } from './../apollo-client-store';

import * as fromUser from '../user/user.reducer';

const modules = {
  'user': fromUser
};

import { FlowsAppState, flowsAppReducer  } from '../flows/states';
import { TasksAppState, tasksAppReducer  } from '../tasks/states';

export interface Action {
  type: string;
  payload?: any;
}

export interface Selector<T, V> {
  (observable$: Observable<T>): Observable<V>;
}

export interface RouterState {
  path: string;
}

export interface AppState {
  router: RouterState;
  user: fromUser.UserState;

  // DKT Apps data state
  apollo: any;

  // DKT Apps UI state
  flowsApp: FlowsAppState;
  tasksApp: TasksAppState;
}

export const reducers = {
  router: routerReducer,
  user: fromUser.userReducer,

  // DKT Apps data state
  apollo: client.reducer() as any,

  // DKT Apps UI state
  flowsApp: flowsAppReducer,
  tasksApp: tasksAppReducer,
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const resetOnLogout = (reducer: Function) => {
  return function (state, action) {
    let newState;
    if (action.type === '[User] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key]['initialState'];
      });
    }
    return reducer(newState || state, action);
  };
};

const DEV_REDUCERS = [
  stateSetter,
  // NB disabled storeFreeze due to issue with zone.js upon failed route
  // transition (caused by a Apollo network error)
  // https://github.com/brandonroberts/ngrx-store-freeze/issues/17
  // storeFreeze
];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1 ) {
    DEV_REDUCERS.push(storeLogger());
}

const developmentReducer = compose(...DEV_REDUCERS, resetOnLogout, combineReducers)(reducers);
const productionReducer = compose(resetOnLogout, combineReducers)(reducers);

export function rootReducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
