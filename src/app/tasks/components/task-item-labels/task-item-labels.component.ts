import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskFilter } from './../../models';

@Component({
  selector: 'dkt-task-item-labels',
  templateUrl: 'task-item-labels.component.html',
  styleUrls: ['task-item-labels.component.css']
})
export class TaskItemLabelsComponent {
  @Input() task: Task;
  @Output() setFilter: EventEmitter<TaskFilter> = new EventEmitter<TaskFilter>();

  filterByFlow() {
    this.setFilter.emit({
      type: 'flowId',
      flowId: this.task.flowRun.flow.id,
      flowName: this.task.flowRun.flow.name
    });
  }

  filterByType() {
    this.setFilter.emit({type: 'taskType', taskType: this.task.type});
  }

  truncate(str: string): string {
    return (str && str.length > 30) ? str.substring(0, 30) + '...' : str;
  }
}
