import { Component, Input } from '@angular/core';
import { Task } from './../../models';
import { TasksAppService } from './../../services';

@Component({
  selector: 'task-description',
  templateUrl: 'task-description.component.html',
  styleUrls: ['task-description.component.css']
})
export class TaskDescriptionComponent {
  @Input() task: Task;

  constructor(
    public tasksApp: TasksAppService,
  ) {}
}
