/* tslint:disable: ter-max-len */
import { Task, TaskType, TaskState } from '../models';

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
    state: TaskState = TaskState.STARTED,
    flow: object = {id: '1', name: 'Flow 1'},
  ): Task {
    return {
      id: id,
      title: title,
      date: date,
      type: type,
      state: state,
      flow: flow,
    };
  }

  createTasksListData(): Task[] {
    return [
      this.createTaskData('1', 'Test Task 1', '1491989405', TaskType.APPROVE, TaskState.STARTED),
      this.createTaskData('2', 'Test Task 2', '1493989405', TaskType.CORRECT, TaskState.STARTED),
      this.createTaskData('3', 'Test Task 3', '1494989405', TaskType.APPROVE, TaskState.STARTED),
      this.createTaskData('4', 'Test Task 4', '1495989405', TaskType.REVIEW, TaskState.NOT_STARTED),
      this.createTaskData('5', 'Test Task 5', '1496989405', TaskType.REVIEW, TaskState.NOT_STARTED),
    ];
  }

  createTaskTypeFilterData(
    taskType: TaskType = TaskType.APPROVE
  ): any {
    return {
      type: 'taskType',
      taskType: taskType,
    };
  }

  createTaskFlowFilterData(
    flowId: String = '1',
    flowName: String = 'Test Flow 1',
  ): any {
    return {
      type: 'flowId',
      flowId: flowId,
      flowName: flowName,
    };
  }

  createTaskFiltersData(): any[] {
    return [
      this.createTaskTypeFilterData(TaskType.APPROVE),
      this.createTaskTypeFilterData(TaskType.REVIEW),
      this.createTaskTypeFilterData(TaskType.CORRECT),
      this.createTaskFlowFilterData('1', 'Test Flow 1'),
      this.createTaskFlowFilterData('2', 'Test Flow 2'),
      this.createTaskFlowFilterData('3', 'Test Flow 3'),
    ];
  }
}
