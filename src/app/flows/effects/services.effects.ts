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
import { ServicesActions } from './../actions';


@Injectable()
export class ServicesEffects {
  constructor(
    private actions$: Actions,
    private api: FlowsApiService,
    private store$: Store<AppState>,
    private servicesActions: ServicesActions
  ) {}

  @Effect()
  loadFlow$ = this.actions$
    .ofType(ServicesActions.LOAD_SERVICES)
    .switchMap(({payload}) => this.api.fetchServices()
      .map(data => this.servicesActions.fetchServicesFulfilled(data))
      .catch(error => Observable.of(this.servicesActions.fetchServicesFailed(error)))
    );
}
