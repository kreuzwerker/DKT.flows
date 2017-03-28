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
  provider: Provider;
  configSchema?: ServiceConfigSchema[];
  samplePayload?: String;
}

export class ServiceType {
  static TRIGGER = 'TRIGGER';
  static ACTION = 'ACTION';
}
