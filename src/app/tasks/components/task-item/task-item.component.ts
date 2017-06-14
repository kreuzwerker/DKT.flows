import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'dkt-task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() setFilter: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {}

  filterByFlow() {
    this.setFilter.emit({
      type: 'flowId',
      flowId: this.task.flow.id,
      flowName: this.task.flow.name
    });
  }

  filterByType() {
    this.setFilter.emit({type: 'taskType', taskType: this.task.type});
  }

  truncate(str: string): string {
    return (str.length > 30) ? str.substring(0, 30) + '...' : str;
  }
}
