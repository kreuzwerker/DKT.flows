import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dkt-tasks-filter',
  templateUrl: 'tasks-filter.component.html',
  styleUrls: ['tasks-filter.component.css']
})
export class TasksFilterComponent {
  @Input() sortingDir: String;
  @Output() sortingDirChange: EventEmitter<String> = new EventEmitter<String>();

  toggleSortingDir() {
    this.sortingDir = this.sortingDir === 'asc' ? 'desc' : 'asc';
    this.sortingDirChange.emit(this.sortingDir);
  }
}
