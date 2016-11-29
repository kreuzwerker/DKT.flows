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
import { FlowsApiService } from './../flows-api.service';
import { getCurrentFlow } from './../reducers';
import { FlowActions } from './../actions';


@Injectable()
export class FlowEffects {
  constructor(
    private actions$: Actions,
    private api: FlowsApiService,
    private store$: Store<AppState>,
    private flowActions: FlowActions
  ) {}

  @Effect()
  loadFlow$ = this.actions$
    .ofType(FlowActions.LOAD_FLOW)
    // .withLatestFrom(this.store$.let(getCurrentFlow()), (action, flow) => ({
    //   payload: action.payload,
    //   flow
    // }))
    // .filter(({flow}) => !flow)

    .switchMap(({payload}) => this.api.fetchFlow(payload)
      .map(data => this.flowActions.fetchFlowFulfilled(data))
      .catch(error => Observable.of(this.flowActions.fetchFlowFailed(error)))
    );
}
