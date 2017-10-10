import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { StateService } from './../../core/services';
import { TasksApiService } from './../services';
import { Task, TaskState } from './../models';
import { TasksAppActions } from './../states';

import { TasksListData } from './task.gql';

@Injectable()
export class TasksStateService extends StateService {
  storeKey = 'tasksApp';

  //
  // App data state
  //

  // All flows list
  tasks$: Observable<TasksListData[]>;
  tasksSub$: Subscription;

  constructor(
    private api: TasksApiService,
    public store: NgRedux<AppState>,
    public actions: TasksAppActions,
  ) {
    super(store);

    // Fetches list of tasks
    // this.dispatch(this.actions.setLoadingTasks(true));
    this.tasks$ = this.api.getTasks().map(({data}) => {
      return data.allTasks;
    });
  }

  setTaskState(task: Task, state: TaskState) {
    // this.dispatch(this.actions.setSavingTask(true, false));
    this.api.updateTaskState({
      id: task.id,
      state: state
    }).subscribe((_task) => {
      this.dispatch(this.actions.updateTask(Object.assign({}, task, {
        state: state
      })));
      // this.dispatch(this.actions.setSavingTask(false, true));
    });
  }
}
