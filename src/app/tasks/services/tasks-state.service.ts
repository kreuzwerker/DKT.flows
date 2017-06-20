import { Injectable } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { StateService } from './../../core/services';
import { Task } from './../models';
import { TasksAppActions } from './../states';

@Injectable()
export class TasksStateService extends StateService {
  storeKey = 'tasksApp';

  constructor(
    public store: NgRedux<AppState>,
    public actions: TasksAppActions,
  ) {
    super(store);
  }
}
