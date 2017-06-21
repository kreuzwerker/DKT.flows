import { Task, TaskType, TaskStateType } from './../models';

export function getTaskStateType(task: Task): TaskStateType {
  switch (task.type) {
    case TaskType.APPROVE:
      return TaskStateType.APPROVE;

    case TaskType.REVIEW:
      return TaskStateType.REVIEW;

    default:
      return TaskStateType.TRANSITIONAL;
  }
}
