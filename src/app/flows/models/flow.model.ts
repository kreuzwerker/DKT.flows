import { Step, StepData } from './step.model';
import { FlowRun } from './flow-run.model';

// NB keep properties in sync with createFlowObject()
export class Flow {
  id: string;
  name: string;
  description: string;
  draft?: boolean;
  steps?: Array<Step>;
  lastFlowRun?: FlowRun;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  draft?: boolean;
  steps?: Array<StepData>;
  lastFlowRun?: FlowRun;
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
