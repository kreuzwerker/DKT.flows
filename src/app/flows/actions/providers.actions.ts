/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Provider } from './../models';

@Injectable()
export class ProvidersActions {

  static SELECT_PROVIDER = 'SELECT_PROVIDER';
  selectProvider(service: Provider): Action {
    return {
      type: ProvidersActions.SELECT_PROVIDER,
      payload: service
    };
  }

  static FETCH_PROVIDERS_SUCCESS = 'FETCH_PROVIDERS_SUCCESS';
  fetchProvidersFulfilled(providers: Provider[]): Action {
    return {
      type: ProvidersActions.FETCH_PROVIDERS_SUCCESS,
      payload: {
        providers: providers
      }
    };
  }

  static FETCH_PROVIDERS_FAILED = 'FETCH_PROVIDERS_FAILED';
  fetchProvidersFailed(error: any): Action {
    return {
      type: ProvidersActions.FETCH_PROVIDERS_FAILED,
      payload: error
    };
  }

  static LOAD_PROVIDERS = 'LOAD_PROVIDERS';
  loadProviders(): Action {
    return {
      type: ProvidersActions.LOAD_PROVIDERS,
    };
  }
}
