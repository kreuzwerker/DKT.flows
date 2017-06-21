import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskState, Task } from './../../models';

@Component({
  selector: 'dkt-task-controls-review',
  templateUrl: 'task-controls-review.component.html',
  styleUrls: ['task-controls-review.component.css'],
})
export class TaskControlsReviewComponent {
  @Input() state: TaskState;
  @Output() setState = new EventEmitter<TaskState>();
  states = TaskState;
}
