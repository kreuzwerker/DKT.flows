import { Service } from './service.model';

export class Provider {
  id: string;
  name: string;
  group: string;
  description: string;
  icon: string;
  services?: Service[];
  selected?: boolean;
}
