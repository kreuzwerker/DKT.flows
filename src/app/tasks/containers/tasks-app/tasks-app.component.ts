import { Component, ViewEncapsulation } from '@angular/core';
import { TasksAppService } from './../../services';

@Component({
  templateUrl: 'tasks-app.component.html',
  styleUrls: ['tasks-app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksAppComponent {
  collapsed: boolean = false;

  constructor(
    public tasksApp: TasksAppService,
  ) {}
}
