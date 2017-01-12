import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../reducers';
import { FlowsApiService } from './../services';
import { FlowActions } from './../actions';


@Injectable()
export class FlowEffects {
  constructor(
    private actions$: Actions,
    private api: FlowsApiService,
    private store$: Store<AppState>,
    private flowActions: FlowActions
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  loadFlow$ = this.actions$
    .ofType(FlowActions.LOAD_FLOW)
    .switchMap(({payload}) => this.api.fetchFlow(payload)
      .map(data => this.flowActions.fetchFlowFulfilled(data))
      .catch(error => Observable.of(this.flowActions.fetchFlowFailed(error)))
    );

  @Effect()
  saveFlow$ = this.actions$
    .ofType(FlowActions.SAVE_FLOW)
    .switchMap(({payload}) => this.api.updateFlow(payload.id, payload.flow)
      .map(data => this.flowActions.updateFlowFulfilled(data))
      .catch(error => Observable.of(this.flowActions.updateFlowFailed(error)))
    );
}
