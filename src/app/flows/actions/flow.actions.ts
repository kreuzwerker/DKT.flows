/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { FlowData } from './../models';

@Injectable()
export class FlowActions {

  static FETCH_FLOW_SUCCESS = 'FETCH_FLOW_SUCCESS';
  fetchFlowFulfilled(flow: FlowData): Action {
    return {
      type: FlowActions.FETCH_FLOW_SUCCESS,
      payload: {
        flow: flow
      }
    };
  }

  static FETCH_FLOW_FAILED = 'FETCH_FLOW_FAILED';
  fetchFlowFailed(error: any): Action {
    return {
      type: FlowActions.FETCH_FLOW_FAILED,
      payload: error
    };
  }

  static LOAD_FLOW = 'LOAD_FLOW';
  loadFlow(id: string): Action {
    return {
      type: FlowActions.LOAD_FLOW,
      payload: id
    };
  }
}
