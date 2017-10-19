import { Flow, Service } from './';

export interface StepConfigParamsInput {
  fieldId: String;
  value: any;
}

// NB keep properties in sync with createStepObject()
export class Step {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
  tested?: boolean;
  flow?: Flow;
}

export class StepData {
  id: string;
  position: number;
  service?: Service;
  configParams?: StepConfigParamsInput[];
  tested?: boolean;
  flow?: Flow;
}

export class StepTest {
  id: string;
  description: string;
  service?: any;
  result: string;
  error: any;
  tested: boolean;
}

export enum StepTestResultType { ERROR, TEXT, HTML, JSON }
