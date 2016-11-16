import { Step } from './step.model';

export class Flow {
  id: number;
  name: string;
  description: string;
  steps?: Array<Step>;
}
