/*
  Shared functionality in the Tasks app
*/

import { Injectable } from '@angular/core';
import { Task, TaskType, TaskState, TaskFilter } from './../models';

import { TASKS_DATA } from './tasks.data';

@Injectable()
export class TasksAppService {
  // Tasks list filters
  filters = [];
  // Tasks list sorting order
  sortingDir: string = 'desc';
  // Tasks list
  tasks: Task[] = TASKS_DATA;

  filtersList: TaskFilter[] = [
    {type: 'taskType', taskType: TaskType.APPROVE},
    {type: 'taskType', taskType: TaskType.REVIEW},
    {type: 'taskType', taskType: TaskType.CORRECT},
    // TODO retrieve flows list from API and append to filtersList asynchronously
    {type: 'flowId', flowId: '1', flowName: 'Test flow 1'},
    {type: 'flowId', flowId: '2', flowName: 'Test flow 2'},
    {type: 'flowId', flowId: '3', flowName: 'Test flow 3'},
  ];

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
    this.tasks = TASKS_DATA.filter((task) => {
      // Validate against current filters (locical OR):
      let valid = false;
      this.filters.forEach((filter) => {
        if (filter.type === 'flowId' && task.flow.id === filter.flowId) valid = true;
        if (filter.type === 'taskType' && task.type === filter.taskType) valid = true;
      });

      return valid;
    });
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
