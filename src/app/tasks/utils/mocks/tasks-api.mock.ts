import { Subject } from 'rxjs/Subject';
import { TasksApiService } from './../../services';

export const mockTasksApi = {
  getTasks() {},
  getTaskItem(id) {},
  updateTaskState(args) {}
} as TasksApiService;

