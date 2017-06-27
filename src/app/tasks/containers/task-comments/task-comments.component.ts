import { Component } from '@angular/core';
import { TasksAppService } from './../../services';

@Component({
  selector: 'task-comments',
  templateUrl: 'task-comments.component.html',
  styleUrls: ['task-comments.component.css']
})
export class TaskCommentsComponent {
  constructor(
    public tasksApp: TasksAppService,
  ) {}
}
