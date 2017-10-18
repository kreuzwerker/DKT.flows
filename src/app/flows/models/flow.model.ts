import { Step, StepData } from './step.model';
import { FlowRun } from './flow-run.model';

export class Flow {
  id: string;
  name: string;
  description: string;
  draft?: boolean;
  steps?: Array<Step>;
  flowRun?: FlowRun;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  draft?: boolean;
  steps?: Array<StepData>;
  flowRun?: FlowRun;
}

export enum FlowState {
  MISSING_TRIGGER,
  UNFINISHED_TRIGGER,
  MISSING_ACTION,
  UNFINISHED_ACTION,
  NOT_DEPLOYED,
  NOT_ACTIVATED,
  NOT_TRIGGERED,
  TRIGGERED
}
