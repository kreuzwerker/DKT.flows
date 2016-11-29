/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

import { Service } from './../models'

@Injectable()
export class ServicesActions {

  static SELECT_SERVICE = 'SELECT_SERVICE';
  selectService(service: Service): Action {
    return {
      type: ServicesActions.SELECT_SERVICE,
      payload: service
    };
  }

  static FETCH_SERVICES_SUCCESS = 'FETCH_SERVICES_SUCCESS';
  fetchServicesFulfilled(services: Service[]): Action {
    return {
      type: ServicesActions.FETCH_SERVICES_SUCCESS,
      payload: {
        services: services
      }
    };
  }

  static FETCH_SERVICES_FAILED = 'FETCH_SERVICES_FAILED';
  fetchServicesFailed(error: any): Action {
    return {
      type: ServicesActions.FETCH_SERVICES_FAILED,
      payload: error
    };
  }

  static LOAD_SERVICES = 'LOAD_SERVICES';
  loadServices(): Action {
    return {
      type: ServicesActions.LOAD_SERVICES,
    };
  }
}
