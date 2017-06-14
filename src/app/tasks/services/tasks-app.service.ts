/*
  Shared functionality in the Tasks app
*/

import { Injectable } from '@angular/core';
import { Task, TaskType, TaskState } from './../models';

import { TASKS_DATA } from './tasks.data';

@Injectable()
export class TasksAppService {
  // Tasks list filters
  filters = [];
  // Tasks list sorting order
  sortingDir: string = 'desc';
  // Tasks list
  tasks: Task[] = TASKS_DATA;

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
      // Validate against current filters
      let invalid = false;
      this.filters.forEach((filter) => {
        if (filter.type === 'flowId' && task.flow.id !== filter.flowId) invalid = true;
        if (filter.type === 'taskType' && task.type !== filter.taskType) invalid = true;
      });

      return invalid === false;
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
