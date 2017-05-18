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

export enum FlowState {
  MISSING_TRIGGER,
  UNFINISHED_TRIGGER,
  MISSING_ACTION,
  UNFINISHED_ACTION,
  NOT_ACTIVATED,
  NOT_TRIGGERED,
  TRIGGERED
}
