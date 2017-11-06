import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { ApolloQueryResult } from 'apollo-client';
import { TasksAppService, TasksStateService, TasksApiService } from './../../services';
import { Task, TaskItem } from './../../models';

@Component({
  templateUrl: 'tasks-app.component.html',
  styleUrls: ['tasks-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TasksAppComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  leftCollapsed: boolean = false;
  rightCollapsed: boolean = true;

  tasksSub$: Subscription;
  requestedTaskId: string = null;
  taskItemSub$: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private api: TasksApiService,
    public tasksApp: TasksAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: TasksStateService,
  ) {
    // NB Since Angular v4.3 this.router.events fire already in constructor
    this.router.events
      .takeUntil(this.ngOnDestroy$)
      .filter(event => event instanceof NavigationEnd)
      .subscribe(this.onTaskRouteChange.bind(this), err =>
        console.log('error', err)
      );
  }

  ngOnInit() {
    // Load tasks data
    this.state.loadTasks();
    // ..and watch changes to tasks data e.g. approving the current selected task
    // NB the current selected task is referenced directly from 'allTasks' in the
    // Apollo store, instead of using a copy. This makes optimistic updates pos-
    // sible, so changes to the data of the current selected task are reflected
    // immediately.
    this.tasksSub$ = this.state.tasks$.takeUntil(this.ngOnDestroy$).subscribe(
      this.onUpdateTasks.bind(this),
      (err) => console.log('error', err)
    );

    this.taskItemSub$ = this.state.taskItem$.takeUntil(this.ngOnDestroy$)
    .filter(res => typeof res.data !== 'undefined')
    .map(res => res.data.TaskItem)
    .subscribe(
      this.onLoadTaskItem.bind(this),
      (err) => console.log('error', err)
    );
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  onUpdateTasks(response: ApolloQueryResult<any>) {
    this.tasksApp.setTasks(response.data);
    // Update the current selected step data on every change event
    this.selectRequestedTask();
    this.cd.markForCheck();
  }

  // Updated requested task ID and select the task if tasks are loaded
  onTaskRouteChange() {
    this.rightCollapsed = !(this.route.children[0]
      && ['comments', 'description'].indexOf(this.route.children[0].snapshot.url[0].path) !== -1);

    this.route.params.forEach((params: Params) => {
      if (params['taskId'] && params['taskId'] !== this.requestedTaskId) {
        this.requestedTaskId = params['taskId'];
        this.selectRequestedTask();
        this.cd.markForCheck();
      }
    });
  }

  selectRequestedTask() {
    let requestedTask = null;
    if (this.requestedTaskId !== null) {
      // Find requested task
      requestedTask = this.tasksApp.tasks.find(task => task.id === this.requestedTaskId) || null;
    }

    this.tasksApp.setTask(requestedTask);

    // Set item of requested task
    if (requestedTask) {
      this.state.loadTaskItem(requestedTask);
    } else {
      this.onLoadTaskItem(null);
    }

    this.cd.markForCheck();
  }

  reloadTasks() {
    this.state.loadTasks();
  }

  onLoadTaskItem(taskItem: TaskItem) {
    this.tasksApp.setTaskItem(taskItem);
    this.cd.markForCheck();
  }
}
