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
import { TasksApiService } from './../services';
import { TasksAppActions } from './';


@Injectable()
export class TasksAppEffects {
  constructor(
    private actions$: Actions,
    private api: TasksApiService,
    private store$: Store<AppState>,
    private actions: TasksAppActions
  ) {}

}
