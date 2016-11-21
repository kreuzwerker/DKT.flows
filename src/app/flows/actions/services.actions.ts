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

  static LOAD_SERVICES_SUCCESS = 'LOAD_SERVICES_SUCCESS';
  loadServices(services: Service[]): Action {
    return {
      type: ServicesActions.LOAD_SERVICES_SUCCESS,
      payload: services
    };
  }
}
