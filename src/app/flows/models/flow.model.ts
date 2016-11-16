import { Step } from './step.model';

export class Flow {
  id: string;
  name: string;
  description: string;
  steps?: Array<Step>;
}
