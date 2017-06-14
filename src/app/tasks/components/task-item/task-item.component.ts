import { Component, Input } from '@angular/core';
import { TasksAppService } from './../../services';
import { Task } from '../../models';

@Component({
  selector: 'dkt-task-item',
  templateUrl: 'task-item.component.html',
  styleUrls: ['task-item.component.css']
})
export class TaskItemComponent {
  @Input() task: Task;

  constructor(
    public tasksApp: TasksAppService,
  ) {}

  filterByFlow() {
    this.tasksApp.setFilter({
      type: 'flowId',
      flowId: this.task.flow.id,
      flowName: this.task.flow.name
    });
  }

  filterByType() {
    this.tasksApp.setFilter({type: 'taskType', taskType: this.task.type});
  }

  truncate(str) {
    return (str.length > 30) ? str.substring(0, 30) + '...' : str;
  }
}
