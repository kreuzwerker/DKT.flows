import { Flow, Step } from './';

export class FlowRun {
  id: string;
  status: string;
  message: string;
  currentStep: number;
  flow?: Flow;
  runs?: Run[];
  runsCount?: number;
}

export class Run {
  id: string;
  status: string;
  currentStep?: Step;
  logs: RunLog;
  result: string;
  startedAt: string;
  finishedAt: string;
}

export class RunLog {
  steps: RunStepLog[];
}

export class RunStepLog {
  id: string;
  position: number;
  status: string;
  message: string;
  timestamp: string;
}
