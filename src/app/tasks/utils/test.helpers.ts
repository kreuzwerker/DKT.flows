/* tslint:disable: ter-max-len */
import { Task, TaskType, TaskState, TaskFilter, TaskComment, TaskItem } from '../models';
import { FlowRun, Step } from '../../flows/models';

export class TestUtils {
  defaultTaskData: Task = null;

  constructor() {
    this.defaultTaskData = this.createTaskData();
  }

  createTaskData(
    id: string = '1',
    title: string = 'Test Task',
    description: string = 'Test Task description',
    date: string = '1491989405',
    type: TaskType = TaskType.APPROVE,
    state: TaskState = TaskState.STARTED,
    flowRun: object = {
      flow: {id: '1', name: 'Flow 1'}
    },
    comments: TaskComment[] = [
      this.createTaskComment()
    ],
  ): Task {
    return {
      id: id,
      title: title,
      description: description,
      date: date,
      type: type,
      state: state,
      flowRun: flowRun as FlowRun,
      comments: comments,
    };
  }

  createTasksListData(): Task[] {
    return [
      this.createTaskData('1', 'Test Task 1', 'Test Task 1 description', '1491989405', TaskType.APPROVE, TaskState.STARTED),
      this.createTaskData('2', 'Test Task 2', 'Test Task 2 description', '1493989405', TaskType.MODIFY, TaskState.STARTED),
      this.createTaskData('3', 'Test Task 3', 'Test Task 3 description', '1494989405', TaskType.APPROVE, TaskState.STARTED),
      this.createTaskData('4', 'Test Task 4', 'Test Task 4 description', '1495989405', TaskType.REVIEW, TaskState.NOT_STARTED),
      this.createTaskData('5', 'Test Task 5', 'Test Task 5 description', '1496989405', TaskType.REVIEW, TaskState.NOT_STARTED),
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
    flowId: string = '1',
    flowName: string = 'Test Flow 1',
  ): TaskFilter {
    return {
      type: 'flowId',
      flowId: flowId,
      flowName: flowName,
    };
  }

  createTaskFiltersData(): TaskFilter[] {
    return [
      this.createTaskTypeFilterData(TaskType.APPROVE),
      this.createTaskTypeFilterData(TaskType.REVIEW),
      this.createTaskTypeFilterData(TaskType.MODIFY),
      this.createTaskFlowFilterData('1', 'Test Flow 1'),
      this.createTaskFlowFilterData('2', 'Test Flow 2'),
      this.createTaskFlowFilterData('3', 'Test Flow 3'),
    ];
  }

  createTaskComment(user = {id: '1', name: 'John Doe'}, text = 'Comment text 1', date = '1491989405'): TaskComment {
    return {
      user: user,
      text: text,
      date: date,
    };
  }

  createTaskItem(id = '1', data = '<p>Task item data</p>', prevStep = {} as Step): TaskItem {
    return {
      id: id,
      data: data,
      prevStep: prevStep,
    };
  }
}
