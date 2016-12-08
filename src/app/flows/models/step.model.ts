import { Provider, Service } from './';

export class Step {
  id: string;
  position: number;
  provider?: Provider;
  service?: Service;
}

export class StepData {
  id: string;
  position: number;
  provider?: Provider;
  service?: Service;
}
