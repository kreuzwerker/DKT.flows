import { Provider, } from './';

export class Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  provider: Provider;
}

export enum ServiceType {
  Trigger = 0,
  Action = 1
}
