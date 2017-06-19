import { Component, Input } from '@angular/core';
import { Task } from './../../models';

@Component({
  selector: 'dkt-task-controls',
  templateUrl: 'task-controls.component.html',
  styleUrls: ['task-controls.component.css']
})
export class TaskControlsComponent {
  @Input() task: Task;
}
