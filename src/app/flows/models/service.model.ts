export class Service {
  id: string;
  name: string;
  description: string;
  type: ServiceType;
}

export enum ServiceType {
  Trigger = 0,
  Action = 1
}