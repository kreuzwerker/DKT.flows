import { ServiceStep } from './service-step.model';

export class Provider {
  name: string;
  group: string;
  description: string;
  icon: string;
  steps?: ServiceStep[];
  selected?: boolean;
}