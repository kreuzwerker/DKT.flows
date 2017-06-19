import { Injectable } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { Task } from './../models';
import { TasksAppActions } from './../states';

@Injectable()
export class TasksStateService {
  constructor(
      private store: NgRedux<AppState>,
      public actions: TasksAppActions,
    ) { }

  //
  // UI State
  //

  // Get a UI state property observable
  select(key: string) {
    return this.store.select('tasksApp')
      .map(state => state[key])
      .distinctUntilChanged();
  }

  // Get a current UI state property value
  get(key: string) {
    // @see http://stackoverflow.com/questions/35633684/how-to-get-current-value-of-state-object-with-ngrx-store
    let value;
    this.store.select('tasksApp')
      .map(state => state[key])
      .take(1)
      .subscribe(s => value = s);

    return value;
  }

  //
  // API
  //

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
