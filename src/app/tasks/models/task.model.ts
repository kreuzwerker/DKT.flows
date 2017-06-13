export class Task {
  id: string;
  title: string;
  date: string;
  type: TaskType;
  state: TaskState;
}

export interface TaskData {
  id: string;
  title: string;
  date: string;
  type: TaskType;
  state: TaskState;
}

export enum TaskType {
  REVIEW = <any>'review',
  APPROVE = <any>'approve',
  CORRECT = <any>'correct'
}

export enum TaskState {
  NOT_STARTED,
  STARTED,
  FINISHED
}
