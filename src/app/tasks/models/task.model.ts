export class Task {
  id: string;
  title: string;
  date: string;
  type: TaskType;
  progress: boolean;
}

export interface TaskData {
  id: string;
  title: string;
  date: string;
  type: TaskType;
  progress: boolean;
}

export enum TaskType {
  REVIEW = <any>'review',
  APPROVE = <any>'approve',
  CORRECT = <any>'correct'
}
