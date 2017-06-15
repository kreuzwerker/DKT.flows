import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TasksAppService } from './../../services';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dkt-tasks-filter',
  templateUrl: 'tasks-filter.component.html',
  styleUrls: ['tasks-filter.component.css']
})
export class TasksFilterComponent {
  @Input() sortingDir: String;
  @Input() filters: any[];
  @Input() filtersList: any[];
  @Output() sortingDirChange: EventEmitter<String> = new EventEmitter<String>();
  @Output() setFilter: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() unsetFilter: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() unsetAllFilters: EventEmitter<void> = new EventEmitter<void>();

  filterCtrl: FormControl;
  filteredFilters: any;

  constructor() {
    this.filterCtrl = new FormControl();
    this.filteredFilters = this.filterCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterFilters(name));
  }

  filterFilters(val: string): any[] {
    return val ? this.filtersList.filter((filter) => {
      const label = this.getFilterLabel(filter);
      return new RegExp(`${val}`, 'gi').test(label);
    }) : this.filtersList;
  }

  selectFilter(event, filter) {
    this.setFilter.emit(filter);
    // Clear search input field
    this.filterCtrl.setValue('');
  }

  toggleSortingDir() {
    this.sortingDir = this.sortingDir === 'asc' ? 'desc' : 'asc';
    this.sortingDirChange.emit(this.sortingDir);
  }

  getFilterLabel(filter, trunc = false) {
    function truncate(str) {
      return (trunc && str.length > 10) ? str.substring(0, 10) + '...' : str;
    }

    const type = filter.type === 'taskType' ? 'type' : 'flow';
    let name = filter.type === 'taskType' ? filter.taskType : filter.flowName;
    return type + ': ' + truncate(name);
  }
}
