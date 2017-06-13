/* tslint:disable: ter-max-len */
import { Task, TaskType } from '../models';

export class TestUtils {
  defaultTaskData: Task = null;

  constructor() {
    this.defaultTaskData = this.createTaskData();
  }

  createTaskData(
    id: string = '1',
    title: string = 'Test Task',
    date: string = '1491989405',
    type: TaskType = TaskType.APPROVE,
    progress: boolean = true,
  ): Task {
    return {
      id: id,
      title: title,
      date: date,
      type: type,
      progress: progress,
    };
  }

  createTasksListData(): Task[] {
    return [
      this.createTaskData('1', 'Test Task 1', '1491989405', TaskType.APPROVE, true),
      this.createTaskData('2', 'Test Task 2', '1493989405', TaskType.CORRECT, true),
      this.createTaskData('3', 'Test Task 3', '1494989405', TaskType.APPROVE, true),
      this.createTaskData('4', 'Test Task 4', '1495989405', TaskType.REVIEW, false),
      this.createTaskData('5', 'Test Task 5', '1496989405', TaskType.REVIEW, false),
    ];
  }
}
