import { Service } from './';

export interface StepConfigParamsInput {
  id: String;
  value: any;
}

export class Step {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
}

export class StepData {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
}
