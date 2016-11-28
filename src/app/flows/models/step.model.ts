import { Service, ServiceStep } from './';

export class Step {
  id: string;
  position: number;
  service?: Service;
  serviceStep?: ServiceStep;
}


