/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Task } from '../models';

@Injectable()
export class TasksAppActions {

  /**
   * Flags
   */

  static SET_LOADING_TASKS = 'SET_LOADING_TASKS';
  setLoadingTasks(loading: boolean) {
    return {
      type: TasksAppActions.SET_LOADING_TASKS,
      payload: loading
    };
  }
}
