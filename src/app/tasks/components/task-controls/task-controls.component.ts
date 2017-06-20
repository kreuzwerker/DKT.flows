import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Task } from './../../models';

@Component({
  selector: 'dkt-task-controls',
  templateUrl: 'task-controls.component.html',
  styleUrls: ['task-controls.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskControlsComponent {
  @Input() task: Task;
  @Input() tasks: Task[];

  getCurrentTaskIndex() {
    if (!this.task) return 0;
    return this.tasks.findIndex((t) => t.id === this.task.id);
  }

  getPrevTaskRoute() {
    const index = this.getCurrentTaskIndex() - 1;
    return (index >= 0) ? '/tasks/' + this.tasks[index].id : null;
  }

  getNextTaskRoute() {
    const index = this.getCurrentTaskIndex() + 1;
    return (index < this.tasks.length) ? '/tasks/' + this.tasks[index].id : null;
  }
}
