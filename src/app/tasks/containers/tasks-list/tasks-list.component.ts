import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';
import { Task } from '../../models';

@Component({
  selector: 'dkt-tasks-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit {
  @Input() tasks: Task[];
  tasksInProgress = [];
  tasksMisc = [];

  constructor() { }

  ngOnInit() {
    this.tasksInProgress = this.tasks.filter(task => task.progress === true);
    this.tasksMisc = this.tasks.filter(task => task.progress === false);
  }
}
