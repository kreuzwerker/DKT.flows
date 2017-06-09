import { Component, ViewEncapsulation } from '@angular/core';
import { Task } from '../../models';

@Component({
  templateUrl: 'tasks-app.component.html',
  styleUrls: ['tasks-app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TasksAppComponent {

  tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      date: '04/14/2016 17:26:04',
      state: 'correct',
      progress: true
    },
    {
      id: '2',
      title: 'Task 2',
      date: '04/14/2016 17:26:04',
      state: 'approve',
      progress: true
    },
    {
      id: '3',
      title: 'Task 3',
      date: '04/14/2016 17:26:04',
      state: 'review',
      progress: true
    },
    {
      id: '4',
      title: 'Task 4',
      date: '04/14/2016 17:26:04',
      state: 'correct',
      progress: true
    },
    {
      id: '5',
      title: 'Task 5',
      date: '04/14/2016 17:26:04',
      state: 'approve',
      progress: false
    },
    {
      id: '6',
      title: 'Task 6',
      date: '04/14/2016 17:26:04',
      state: 'correct',
      progress: false
    },
    {
      id: '7',
      title: 'Task 7',
      date: '04/14/2016 17:26:04',
      state: 'correct',
      progress: false
    },
  ];
}
