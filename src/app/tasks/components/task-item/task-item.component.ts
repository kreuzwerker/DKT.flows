import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskFilter } from '../../models';
import { TasksAppService } from './../../services';

@Component({
  selector: 'dkt-task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;
  @Output() setFilter: EventEmitter<TaskFilter> = new EventEmitter<TaskFilter>();

  constructor(
    public tasksApp: TasksAppService
  ) {}
}
