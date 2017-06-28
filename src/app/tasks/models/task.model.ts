import { User } from '../../user/user.model';

export class Task {
  id: string;
  title: string;
  description: string;
  date: string;
  type: TaskType;
  state: TaskState;
  flow: any;
  comments: TaskComment[];
}

export interface TaskData {
  id: string;
  title: string;
  description: string;
  date: string;
  type: TaskType;
  state: TaskState;
  flow: any;
  comments: TaskComment[];
}

export enum TaskType {
  REVIEW = <any>'review',
  APPROVE = <any>'approve',
  CORRECT = <any>'correct'
}

export enum TaskState {
  NOT_STARTED,
  STARTED,
  PAUSED,
  FINISHED,
  APPROVED,
  REJECTED,
  REVIEWED
}

export enum TaskStateType {
  TRANSITIONAL,
  APPROVE,
  REVIEW
}

export class TaskComment {
  text: string;
  date: string;
  user: User;
}
