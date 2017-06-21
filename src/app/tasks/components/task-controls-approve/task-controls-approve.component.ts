import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskState, Task } from './../../models';

@Component({
  selector: 'dkt-task-controls-approve',
  templateUrl: 'task-controls-approve.component.html',
  styleUrls: ['task-controls-approve.component.css'],
})
export class TaskControlsApproveComponent {
  @Input() state: TaskState;
  @Output() setState = new EventEmitter<TaskState>();
  states = TaskState;
}
