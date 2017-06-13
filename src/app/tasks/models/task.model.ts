export class Task {
  id: string;
  title: string;
  date: string;
  type: string;
  progress: boolean;
}

export interface TaskData {
  id: string;
  title: string;
  date: string;
  type: string;
  progress: boolean;
}
