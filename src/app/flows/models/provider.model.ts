import { Service } from './service.model';

export class Provider {
  name: string;
  group: string;
  description: string;
  icon: string;
  steps?: Service[];
  selected?: boolean;
}