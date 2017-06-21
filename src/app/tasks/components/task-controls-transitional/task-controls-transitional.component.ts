import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskState, Task } from './../../models';

@Component({
  selector: 'dkt-task-controls-transitional',
  templateUrl: 'task-controls-transitional.component.html',
  styleUrls: ['task-controls-transitional.component.css'],
})
export class TaskControlsTransitionalComponent {
  @Input() state: TaskState;
  @Output() setState = new EventEmitter<TaskState>();
  states = TaskState;
}
