/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Task } from '../models';

@Injectable()
export class TasksAppActions {

  static SELECT_TASK = 'SELECT_TASK';
  selectTask(task: Task) {
    return {
      type: TasksAppActions.SELECT_TASK,
      payload: task
    };
  }

  static UPDATE_TASK = 'UPDATE_TASK';
  updateTask(task: Task) {
    return {
      type: TasksAppActions.UPDATE_TASK,
      payload: task
    };
  }
}
