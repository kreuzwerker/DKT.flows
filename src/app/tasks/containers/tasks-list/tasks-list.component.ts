import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task, TaskState } from '../../models';
import { TasksAppService } from './../../services';

@Component({
  selector: 'dkt-tasks-list',
  templateUrl: 'tasks-list.component.html',
  styleUrls: ['tasks-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent implements OnInit, OnChanges {
  @Input() tasks: Task[];
  @Input() sortingDir: String;
  tasksInProgress = [];
  tasksMisc = [];

  constructor(
    private cd: ChangeDetectorRef,
    public tasksApp: TasksAppService,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks'] !== undefined) {
      this.tasks = changes['tasks']['currentValue'];
      this.splitTasks();
      this.cd.markForCheck();
    }
  }

  ngOnInit() {
    this.splitTasks();
  }

  splitTasks() {
    this.tasksInProgress = this.tasks.filter(task => task.state === TaskState.STARTED);
    this.tasksMisc = this.tasks.filter(task => task.state === TaskState.NOT_STARTED);
  }
}
