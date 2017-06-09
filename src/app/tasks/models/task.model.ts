export class Task {
  id: string;
  title: string;
  date: string;
  state: string;
  progress: boolean;
}

export interface TaskData {
  id: string;
  title: string;
  date: string;
  state: string;
  progress: boolean;
}
