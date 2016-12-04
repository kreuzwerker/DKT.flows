export class ServiceStep {
  id: string;
  name: string;
  description: string;
  type: ServiceStepType;
}

export enum ServiceStepType {
  Trigger = 0,
  Action = 1
}