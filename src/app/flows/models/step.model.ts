import { Service } from './';

export interface StepConfigParam {
  id: String;
  value: any;
}

export class Step {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParam[];
}

export class StepData {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParam[];
}
