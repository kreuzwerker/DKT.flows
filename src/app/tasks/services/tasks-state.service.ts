import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { ApolloQueryResult } from 'apollo-client';
import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { BaseStateService } from './../../core/services';
import { TasksApiService } from './../services';
import { Task, TaskState, TaskItem } from './../models';
import { TasksAppActions } from './../states';

import { TasksListData } from './task.gql';

@Injectable()
export class TasksStateService extends BaseStateService {
  storeKey = 'tasksApp';

  //
  // App data state
  //

  // All tasks list
  tasks$: Observable<ApolloQueryResult<TasksListData>>;
  tasksSub$: Subscription;

  // Item of current selected task
  // Fetches item of current selected task reactively as soon as taskItemId gets
  // set or changes, i.e. DOES NOT fetch item data when taskItemId is null or unchanged.
  taskItemId$ = new Subject<string>();
  taskItem$: Observable<ApolloQueryResult<any>> = this.api.getTaskItem(
    this.taskItemId$.asObservable()
  );

  constructor(
    private api: TasksApiService,
    public store: NgRedux<AppState>,
    public actions: TasksAppActions
  ) {
    super(store);
  }

  loadTasks() {
    // Fetch an up-to-date list of tasks
    this.dispatch(this.actions.setLoadingTasks(true));
    this.tasks$ = this.api.getTasks().map(response => {
      // Flatten the data object to array of tasks
      const data =
        response.data && response.data.allTasks ? response.data.allTasks : [];
      // Return the full response including the loading flag
      return Object.assign({}, response, { data: data });
    });

    // Unset loading tasks flag
    this.tasksSub$ = this.tasks$.subscribe(response => {
      // The first response will contain cached data. Keep showing the loading
      // indicator until the response contains data fetched via network.
      // NB see getTasks() fetch policy 'cache-and-network' property
      if (!response.loading) {
        this.dispatch(this.actions.setLoadingTasks(false));
        this.tasksSub$.unsubscribe();
      }
    });
  }

  loadTaskItem(task: Task) {
    // Show loading indicator only for network requests
    //
    // Workaround for issue: no distinction between network and cache response possible
    // https://github.com/apollographql/apollo-client/issues/2294
    //
    // Wait a bit before showing the loading indicator: if it's a network request
    // which takes longer to complete, then the loader will be shown. A cache
    // request completes immediately and thus no loader is shown.
    const showLoadingIndicator = setTimeout(
      () => this.dispatch(this.actions.setLoadingTaskItem(true)),
      1
    );
    const taskItemSub$ = this.taskItem$.subscribe(response => {
      clearTimeout(showLoadingIndicator);
      this.dispatch(this.actions.setLoadingTaskItem(false));
      taskItemSub$.unsubscribe();
    });

    // Fetch the item of the given task
    this.taskItemId$.next(task.id);
  }

  setTaskState(task: Task, state: TaskState) {
    // this.dispatch(this.actions.setSavingTask(true, false));
    this.api
      .updateTaskState({
        id: task.id,
        state: state
      })
      .subscribe(_task => {
        // this.dispatch(this.actions.setSavingTask(false, true));
      });
  }
}
