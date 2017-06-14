import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TasksAppService } from './../../services';

@Component({
  selector: 'dkt-tasks-filter',
  templateUrl: 'tasks-filter.component.html',
  styleUrls: ['tasks-filter.component.css']
})
export class TasksFilterComponent {
  @Input() sortingDir: String;
  @Output() sortingDirChange: EventEmitter<String> = new EventEmitter<String>();

  constructor(
    public tasksApp: TasksAppService,
  ) {}

  toggleSortingDir() {
    this.sortingDir = this.sortingDir === 'asc' ? 'desc' : 'asc';
    this.sortingDirChange.emit(this.sortingDir);
  }

  getFilterLabel(filter) {
    function truncate(str) {
      return (str.length > 10) ? str.substring(0, 10) + '...' : str;
    }

    const type = filter.type === 'taskType' ? 'type' : 'flow';
    let name = filter.type === 'taskType' ? filter.taskType : filter.flowName;
    return type + ': ' + truncate(name);
  }
}
