import { Flow } from './flow.model';

export class FlowRun {
  id: string;
  status: string;
  message: string;
  currentStep: number;
  flow?: Flow;
}

