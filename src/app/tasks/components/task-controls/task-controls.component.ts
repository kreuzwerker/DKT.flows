import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Task, TaskState, TaskStateType } from './../../models';
import * as taskHelpers from './../../utils/task.helpers';

@Component({
  selector: 'dkt-task-controls',
  templateUrl: 'task-controls.component.html',
  styleUrls: ['task-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TaskControlsComponent {
  @Input() task: Task;
  @Input() tasks: Task[];
  @Output() setState = new EventEmitter<TaskState>();
  stateType = TaskStateType;

  getCurrentTaskIndex() {
    if (!this.task) return 0;
    return this.tasks.findIndex((t) => t.id === this.task.id);
  }

  getPrevTaskRoute() {
    const index = this.getCurrentTaskIndex() - 1;
    return (index >= 0) ? '/tasks/' + this.tasks[index].id : null;
  }

  getNextTaskRoute() {
    const index = this.getCurrentTaskIndex() + 1;
    return (index < this.tasks.length) ? '/tasks/' + this.tasks[index].id : null;
  }

  getStateType() {
    return taskHelpers.getTaskStateType(this.task);
  }
}
