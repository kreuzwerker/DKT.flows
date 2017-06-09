import { Component, Input } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'dkt-task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;
}
