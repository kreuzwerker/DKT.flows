/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

@Injectable()
export class FlowActions {

  static LOAD_FLOW = 'LOAD_FLOW';
  loadFlow(id: string): Action {
    return {
      type: FlowActions.LOAD_FLOW,
      payload: id
    };
  }
}
