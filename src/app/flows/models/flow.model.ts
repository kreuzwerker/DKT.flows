import { Step, StepData } from './step.model';

export class Flow {
  id: string;
  name: string;
  description: string;
  steps?: Array<Step>;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  steps?: Array<StepData>;
}
