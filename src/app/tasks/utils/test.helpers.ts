/* tslint:disable: ter-max-len */
import { Task } from '../models';

export class TestUtils {
  defaultTaskData: Task = null;

  constructor() {
    this.defaultTaskData = this.createTaskData();
  }

  createTaskData(
    id: string = '1',
    title: string = 'Test Task',
    date: string = '1491989405',
    state: string = 'approve',
    progress: boolean = true,
  ): Task {
    return {
      id: id,
      title: title,
      date: date,
      state: state,
      progress: progress,
    };
  }

  createTasksListData(): Task[] {
    return [
      this.createTaskData('1', 'Test Task 1', '1491989405', 'approve', true),
      this.createTaskData('2', 'Test Task 2', '1493989405', 'correct', true),
      this.createTaskData('3', 'Test Task 3', '1494989405', 'approve', true),
      this.createTaskData('4', 'Test Task 4', '1495989405', 'review', false),
      this.createTaskData('5', 'Test Task 5', '1496989405', 'review', false),
    ];
  }
}
