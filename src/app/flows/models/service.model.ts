import { Provider } from './';

export interface ServiceConfigSchema {
  fieldId: String;
  type: String;
  label: String;
  position: Number;
  defaultValue: any;
  required: Boolean;
  options?: Map<string, any>[];
  samplePayload?: String;
}

export class Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  task: boolean;
  provider: Provider;
  configSchema?: ServiceConfigSchema[];
  samplePayload?: String;
  inputType: ServiceIOType;
  outputType: ServiceIOType;
}

export class ServiceType {
  static TRIGGER = 'TRIGGER';
  static ACTION = 'ACTION';
}

export class ServiceIOType {
  static JSON = 'json';
  static HTML = 'html';
  static STRING = 'string';
  static NUMBER = 'number';
  static CSV = 'csv';
  static URL = 'url';
  static IMAGE = 'image';
}
