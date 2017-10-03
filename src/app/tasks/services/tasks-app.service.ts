/*
  Shared functionality in the Tasks app
*/

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { TasksStateService } from './../../tasks/services';
import { Task, TaskType, TaskState, TaskFilter, TaskComment } from './../models';

// Flows app
import { FlowsApiService } from './../../flows/services';
import { Flow } from './../../flows/models';

@Injectable()
export class TasksAppService {
  // Current child path e.g. 'description', 'comments'
  currentTaskRoute: string = null;
  // Current selected task
  task: Task = null;
  // Tasks list filters
  filters = [];
  // Filters list
  filtersList: TaskFilter[];
  // Tasks list sorting order
  sortingDir: string = 'desc';
  // Tasks list
  tasksSub$: Subscription;
  tasks: Task[] = [];
  // Flows list
  flowsSub$: Subscription;

  constructor(
    private api: FlowsApiService,
    public router: Router,
    public state: TasksStateService
  ) {
    this.initFlowFilters();

    // Load flows and register as filters
    // NB updates the filters list on every change to the flows list (added/removed)
    this.flowsSub$ = this.api.getFlows().map(({data}) => data.allFlows).subscribe((flows) => {
      this.initFlowFilters(flows);
    });

    this.router.events.filter(event => event instanceof NavigationEnd)
    .subscribe(
      this.onRouteChange.bind(this),
      (err) => console.log('error', err)
    );
  }

  onRouteChange() {
    this.currentTaskRoute =
      this.router.routerState.root.children[0].children[0]
      && this.router.routerState.root.children[0].children[0].snapshot.url[0]
      ? this.router.routerState.root.children[0].children[0].snapshot.url[0].path
      : null;
  }

  onLoadTasks(tasks): void {
    this.tasks = tasks;
    this.sortTasks(this.sortingDir);
  }

  setTask(task: Task): void {
    this.task = task;
  }

  /**
   * Tasks routing
   */

  // Navigates to the given task's route and keeps the current child route
  // e.g. /tasks/1/description
  goToTaskRoute(task) {
    let path = ['tasks', task.id];
    if (this.currentTaskRoute) {
      path.push(this.currentTaskRoute);
    }

    this.router.navigate(path);
  }

  isActiveTask(task) {
    return this.task && this.task.id === task.id;
  }

  /**
   * Tasks sorting
   */

  sortTasks(dir) {
    let tasksInProgress = this.tasks.filter(task => task.state === TaskState.STARTED);
    let tasksMisc = this.tasks.filter(task => task.state !== TaskState.STARTED);

    tasksInProgress = _.sortBy(tasksInProgress, 'date');
    tasksMisc = _.sortBy(tasksMisc, 'date');

    if (dir === 'desc') {
      tasksInProgress = tasksInProgress.reverse();
      tasksMisc = tasksMisc.reverse();
    }

    this.tasks = tasksInProgress.concat(tasksMisc);
  }

  setSortingDir(dir: string) {
    this.sortingDir = dir;
    this.sortTasks(this.sortingDir);
  }

  /**
   * Task filters list
   */

  initFlowFilters(flows: Flow[] = []) {
    // Register type filters
    this.filtersList = [
      {type: 'taskType', taskType: TaskType.APPROVE},
      {type: 'taskType', taskType: TaskType.REVIEW},
      {type: 'taskType', taskType: TaskType.CORRECT},
    ];

    // Register flow filters
    flows.forEach(flow => {
      this.filtersList.push({type: 'flowId', flowId: flow.id, flowName: flow.name});
    });
  }

  /**
   * Task filters
   */

  setFilter(params) {
    if (this.filterExists(params)) return;
    this.filters.push(params);
    this.applyFilters();
  }

  unsetFilter(params) {
    this.filters = this.filters.filter((filter) => {
      return filter.type !== params.type || filter[params.type] !== params[params.type];
    });
    this.applyFilters();
  }

  unsetAllFilters() {
    this.filters = [];
    this.applyFilters();
  }

  applyFilters() {
    this.tasks = this.filters.length ? this.tasks.filter((task) => {
      // Validate against current filters (locical OR):
      let valid = false;
      this.filters.forEach((filter) => {
        if (filter.type === 'flowId' && task.flow.flow.id === filter.flowId) valid = true;
        if (filter.type === 'taskType' && task.type === filter.taskType) valid = true;
      });

      return valid;
    }) : this.tasks;
    this.sortTasks(this.sortingDir);
  }

  filterExists(params) {
    let exists = false;
    this.filters.forEach((filter) => {
      if (filter.type === params.type && filter[filter.type] === params[filter.type]) {
        exists = true;
      }
    });
    return exists;
  }

  /**
   * Task comments
   */

  addTaskComment(comment: string) {
    // TODO implement with Apollo
    alert(`TODO persist new comment: ${comment}`);
  }
}
