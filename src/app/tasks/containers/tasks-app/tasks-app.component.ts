import { Component, ViewEncapsulation } from '@angular/core';
import { Task, TaskType } from '../../models';

@Component({
  templateUrl: 'tasks-app.component.html',
  styleUrls: ['tasks-app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksAppComponent {
  collapsed: boolean = false;
  sortingDir: string = 'desc';

  tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      date: '1489311005',
      type: TaskType.CORRECT,
      progress: true
    },
    {
      id: '2',
      title: 'Task 2',
      date: '1491989405',
      type: TaskType.APPROVE,
      progress: true
    },
    {
      id: '3',
      title: 'Task 3',
      date: '1494581405',
      type: TaskType.REVIEW,
      progress: true
    },
    {
      id: '4',
      title: 'Task 4',
      date: '1497259805',
      type: TaskType.CORRECT,
      progress: true
    },
    {
      id: '5',
      title: 'Task 5',
      date: '1486891805',
      type: TaskType.APPROVE,
      progress: false
    },
    {
      id: '6',
      title: 'Task 6',
      date: '1484213405',
      type: TaskType.CORRECT,
      progress: false
    },
    {
      id: '7',
      title: 'Task 7',
      date: '1483263005',
      type: TaskType.CORRECT,
      progress: false
    },
  ];
}
