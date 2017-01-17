import { Service } from './service.model';

export class Provider {
  name: string;
  group: string;
  description: string;
  icon: string;
  services?: Service[];
  selected?: boolean;
}
