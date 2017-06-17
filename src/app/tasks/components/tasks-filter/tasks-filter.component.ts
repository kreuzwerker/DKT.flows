import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TasksAppService } from './../../services';
import { TaskFilter } from './../../models';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dkt-tasks-filter',
  templateUrl: 'tasks-filter.component.html',
  styleUrls: ['tasks-filter.component.css']
})
export class TasksFilterComponent implements OnChanges {
  @Input() sortingDir: String;
  @Input() filters: TaskFilter[];
  @Input() filtersList: TaskFilter[];
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

  ngOnChanges(changes: SimpleChanges) {
    // NB The flow filters in filtersList get loaded asynchronously. We need to
    // emit a stream event in order to re-populate filteredFilters with the new
    // flow filters.
    if (changes['filtersList'] !== undefined) {
      this.filterCtrl.setValue('');
    }
  }

  filterFilters(val: string): any[] {
    return val ? this.filtersList.filter((filter) => {
      const label = this.getFilterLabel(filter);
      return new RegExp(`${val}`, 'gi').test(label);
    }) : this.filtersList;
  }

  selectFilter(event, filter: TaskFilter): void {
    // Only act upon user initiated selections
    if (!event.isUserInput) return;
    this.setFilter.emit(filter);
    // Clear search input field
    this.filterCtrl.setValue('');
  }

  toggleSortingDir(): void {
    this.sortingDir = this.sortingDir === 'asc' ? 'desc' : 'asc';
    this.sortingDirChange.emit(this.sortingDir);
  }

  getFilterLabel(filter: TaskFilter, trunc = false): string {
    function truncate(str) {
      return (trunc && str.length > 10) ? str.substring(0, 10) + '...' : str;
    }

    const type = filter.type === 'taskType' ? 'type' : 'flow';
    let name = filter.type === 'taskType' ? filter.taskType : filter.flowName;
    return type + ': ' + truncate(name);
  }
}
