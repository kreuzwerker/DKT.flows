import { Flow } from './flow.model';

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
  logs: Log[];
  result: string;
  startedAt: string;
  finishedAt: string;
}

export class Log {
  steps: StepLog[];
}

export class StepLog {
  id: string;
  position: number;
  status: string;
  message: string;
  timestamp: string;
}
