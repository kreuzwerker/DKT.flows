import { ServiceStep } from './service-step.model';

export class Service {
  name: string;
  group: string;
  description: string;
  icon: string;
  
  steps?: ServiceStep[];
}