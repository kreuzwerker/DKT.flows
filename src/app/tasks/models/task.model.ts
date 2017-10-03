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
  REVIEW = <any>'REVIEW',
  APPROVE = <any>'APPROVE',
  CORRECT = <any>'CORRECT'
}

export enum TaskState {
  NOT_STARTED = <any>'NOT_STARTED',
  STARTED = <any>'STARTED',
  PAUSED = <any>'PAUSED',
  FINISHED = <any>'FINISHED',
  APPROVED = <any>'APPROVED',
  REJECTED = <any>'REJECTED',
  REVIEWED = <any>'REVIEWED'
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
