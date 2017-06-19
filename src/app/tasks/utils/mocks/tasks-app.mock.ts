import { TasksAppService } from './../../services';
import { Task } from './../../models';

export const mockTasksApp = {
  setTask(task: Task): void {},
  setFilter(params): void {}
} as TasksAppService;
