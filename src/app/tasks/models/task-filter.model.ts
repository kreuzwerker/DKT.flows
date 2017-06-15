import { TaskType } from './task.model';

export class TaskFilter {
  type: string;
  taskType?: TaskType;
  flowId?: string;
  flowName?: string;
}
