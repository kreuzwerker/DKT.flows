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
import { StepActions } from './../actions';


@Injectable()
export class StepEffects {
  constructor(
    private actions$: Actions,
    private api: FlowsApiService,
    private store$: Store<AppState>,
    private stepActions: StepActions
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  saveStep$ = this.actions$
    .ofType(StepActions.SAVE_STEP)
    .switchMap(({payload}) => this.api.updateFlowStep(payload.flowId, payload.stepId, payload.step)
      .map(data => this.stepActions.updateStepFulfilled(data))
      .catch(error => Observable.of(this.stepActions.updateStepFailed(error)))
    );
}
