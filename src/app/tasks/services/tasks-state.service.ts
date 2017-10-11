import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ApolloQueryResult } from 'apollo-client';
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

  // All tasks list
  tasks$: Observable<ApolloQueryResult<TasksListData>>;
  tasksSub$: Subscription;

  constructor(
    private api: TasksApiService,
    public store: NgRedux<AppState>,
    public actions: TasksAppActions,
  ) {
    super(store);
  }

  loadTasks() {
    // Fetches an up-to-date list of tasks
    this.dispatch(this.actions.setLoadingTasks(true));
    this.tasks$ = this.api.getTasks().map((response) => {
      // Flatten the data object to array of tasks
      const data = response.data && response.data.allTasks ? response.data.allTasks : [];
      // Return the full response including the loading flag
      return Object.assign({}, response, {data: data});
    });

    // Unset loading tasks flag
    this.tasksSub$ = this.tasks$.subscribe((response) => {
      // The first response will contain cached data. Keep showing the loading
      // indicator until the response contains data fetched via network.
      // NB see getTasks() fetch policy 'cache-and-network' property
      if (!response.loading) {
        this.dispatch(this.actions.setLoadingTasks(false));
        this.tasksSub$.unsubscribe();
      }
    });
  }

  setTaskState(task: Task, state: TaskState) {
    // this.dispatch(this.actions.setSavingTask(true, false));
    this.api.updateTaskState({
      id: task.id,
      state: state
    }).subscribe((_task) => {
      // this.dispatch(this.actions.setSavingTask(false, true));
    });
  }
}
