import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models';

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
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sortingDir'] !== undefined) {
      this.sortTasks(changes['sortingDir']['currentValue']);
    }
    this.cd.markForCheck();
  }

  ngOnInit() {
    this.splitTasks();
    this.sortTasks(this.sortingDir);
  }

  splitTasks() {
    this.tasksInProgress = this.tasks.filter(task => task.progress === true);
    this.tasksMisc = this.tasks.filter(task => task.progress === false);
  }

  sortTasks(dir) {
    const compare = (a, b) => {
      if (a.date < b.date)
        return -1;
      if (a.date > b.date)
        return 1;
      return 0;
    };

    this.tasksInProgress = this.tasksInProgress.sort(compare);
    this.tasksMisc = this.tasksMisc.sort(compare);

    if (dir === 'desc') {
      this.tasksInProgress = this.tasksInProgress.reverse();
      this.tasksMisc = this.tasksMisc.reverse();
    }
  }
}
