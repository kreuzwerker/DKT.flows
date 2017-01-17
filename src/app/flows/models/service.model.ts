import { Provider, } from './';

export class Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
  provider: Provider;
}

export class ServiceType {
  static Trigger = 'TRIGGER';
  static Action = 'ACTION';
}
