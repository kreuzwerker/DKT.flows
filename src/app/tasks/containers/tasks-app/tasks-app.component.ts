import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { TasksAppService, TasksStateService } from './../../services';
import { Task } from './../../models';

@Component({
  templateUrl: 'tasks-app.component.html',
  styleUrls: ['tasks-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TasksAppComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  leftCollapsed: boolean = false;
  rightCollapsed: boolean = true;

  requestedTaskId: string = null;

  constructor(
    private cd: ChangeDetectorRef,
    public tasksApp: TasksAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: TasksStateService,
  ) {}

  ngOnInit() {
    this.router.events.takeUntil(this.ngOnDestroy$).filter(event => event instanceof NavigationEnd)
    .subscribe(
      this.onTaskRouteChange.bind(this),
      (err) => console.log('error', err)
    );

    // Load tasks data
    this.state.loadTasks();
    // ..and watch changes to tasks data
    this.tasksApp.tasksSub$ = this.state.tasks$.takeUntil(this.ngOnDestroy$).subscribe((tasks) => {
      this.tasksApp.setTasks(tasks);
      // Set/update the data of the current selected step on every change event
      this.selectRequestedTask();
      this.cd.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  // Updated requested task ID and select the task if tasks are loaded
  onTaskRouteChange() {
    this.rightCollapsed = !(this.route.children[0]
      && ['comments', 'description'].indexOf(this.route.children[0].snapshot.url[0].path) !== -1);

    this.route.params.forEach((params: Params) => {
      if (params['taskId'] && params['taskId'] !== this.requestedTaskId) {
        this.requestedTaskId = params['taskId'];
        this.selectRequestedTask();
        this.cd.markForCheck();
      }
    });
  }

  selectRequestedTask() {
    let requestedTask = null;
    if (this.requestedTaskId !== null) {
      // Find requested task
      requestedTask = this.tasksApp.tasks.find(task => task.id === this.requestedTaskId) || null;
    }

    this.tasksApp.setTask(requestedTask);
    this.cd.markForCheck();
  }
}
