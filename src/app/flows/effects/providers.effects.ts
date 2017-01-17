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
import { ProvidersActions } from './../actions';


@Injectable()
export class ProvidersEffects {
  constructor(
    private actions$: Actions,
    private api: FlowsApiService,
    private store$: Store<AppState>,
    private providersActions: ProvidersActions
  ) {}

  // tslint:disable-next-line:member-ordering
  // @Effect()
  // loadFlow$ = this.actions$
  //   .ofType(ProvidersActions.LOAD_PROVIDERS)
  //   .switchMap(({payload}) => this.api.fetchProviders()
  //     .map(data => this.providersActions.fetchProvidersFulfilled(data))
  //     .catch(error => Observable.of(this.providersActions.fetchProvidersFailed(error)))
  //   );
}
