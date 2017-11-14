import { Step, StepData } from './step.model';
import { FlowRun, Run } from './flow-run.model';

// NB keep properties in sync with createFlowObject()
export class Flow {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  draft?: boolean;
  steps?: Array<Step>;
  lastFlowRun?: FlowRun;
  runs?: Run[];
  runsCount?: number;
}

export interface FlowData {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  draft?: boolean;
  steps?: Array<StepData>;
  lastFlowRun?: FlowRun;
  runs?: Run[];
  runsCount?: number;
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
