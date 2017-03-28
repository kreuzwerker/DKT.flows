import { Service } from './';

export interface StepConfigParamsInput {
  fieldId: String;
  value: any;
}

export class Step {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
  tested?: boolean;
}

export class StepData {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
  tested?: boolean;
}

export class StepTest {
  id: string;
  description: string;
  service?: any;
  result: string;
  error: any;
  tested: boolean;
}
