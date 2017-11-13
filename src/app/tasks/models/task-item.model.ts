import { Step } from '../../flows/models';

export class TaskItem {
  id: string;
  data: string;
  prevStep: Step;
}
