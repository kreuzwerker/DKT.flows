import { Provider, ServiceStep } from './';

export class Step {
  id: string;
  position: number;
  provider?: Provider;
  serviceStep?: ServiceStep;
}

export class StepData {
  id: string;
  position: number;
  provider?: Provider;
  serviceStep?: ServiceStep;
}
