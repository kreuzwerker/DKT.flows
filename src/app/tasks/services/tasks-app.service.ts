/*
  Shared functionality in the Tasks app
*/

import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Task, TaskType, TaskState, TaskFilter } from './../models';

// Flows app
import { FlowsApiService } from './../../flows/services';
import { Flow } from './../../flows/models';

// Tasks mock data
import { TASKS_DATA } from './tasks.data';

@Injectable()
export class TasksAppService {
  // Tasks list filters
  filters = [];
  // Filters list
  filtersList: TaskFilter[];
  // Tasks list sorting order
  sortingDir: string = 'desc';
  // Tasks list
  tasks: Task[] = TASKS_DATA;
  // Flows list
  flowsSub$: Subscription;


  constructor(
    private api: FlowsApiService,
  ) {
    this.initFlowFilters();

    // Load flows and register as filters
    // NB updates the filters list on every change to the flows list (added/removed)
    this.flowsSub$ = this.api.getFlows().map(({data}) => data.allFlows).subscribe((flows) => {
      this.initFlowFilters(flows);
    });
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
    this.tasks = this.filters.length ? TASKS_DATA.filter((task) => {
      // Validate against current filters (locical OR):
      let valid = false;
      this.filters.forEach((filter) => {
        if (filter.type === 'flowId' && task.flow.id === filter.flowId) valid = true;
        if (filter.type === 'taskType' && task.type === filter.taskType) valid = true;
      });

      return valid;
    }) : TASKS_DATA;
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
}
