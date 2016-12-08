/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { FlowData } from './../models';

@Injectable()
export class FlowActions {

  /*
    Load flow
  */

  static LOAD_FLOW = 'LOAD_FLOW';
  loadFlow(id: string): Action {
    return {
      type: FlowActions.LOAD_FLOW,
      payload: id
    };
  }

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

  /*
    Update flow
  */

  static SAVE_FLOW = 'SAVE_FLOW';
  saveFlow(id: string, flow: FlowData): Action {
    return {
      type: FlowActions.SAVE_FLOW,
      payload: {
        id: id,
        flow: flow
      }
    };
  }

  static UPDATE_FLOW_SUCCESS = 'UPDATE_FLOW_SUCCESS';
  updateFlowFulfilled(flow: FlowData): Action {
    return {
      type: FlowActions.UPDATE_FLOW_SUCCESS,
      payload: {
        flow: flow
      }
    };
  }

  static UPDATE_FLOW_FAILED = 'UPDATE_FLOW_FAILED';
  updateFlowFailed(error: any): Action {
    return {
      type: FlowActions.UPDATE_FLOW_FAILED,
      payload: error
    };
  }
}
