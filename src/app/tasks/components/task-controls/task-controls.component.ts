import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { Task, TaskState, TaskStateType } from './../../models';
import { TasksAppService } from './../../services';
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

  constructor(
    public tasksApp: TasksAppService,
  ) {}

  getCurrentTaskIndex() {
    if (!this.task) return 0;
    return this.tasks.findIndex((t) => t.id === this.task.id);
  }

  getPrevTask() {
    const index = this.getCurrentTaskIndex() - 1;
    return (index >= 0) ? this.tasks[index] : null;
  }

  getNextTask() {
    const index = this.getCurrentTaskIndex() + 1;
    return (index < this.tasks.length) ? this.tasks[index] : null;
  }

  getStateType() {
    return taskHelpers.getTaskStateType(this.task);
  }
}
