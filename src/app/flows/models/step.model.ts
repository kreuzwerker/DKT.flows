// import { Service } from './service.model';

export class Step {
  id: number;

  /*
  How should this be implemented?
  - step.service should be a persisted property that tells us about which
    service and which service step this step uses.
  */

  service?: {
    name: string;
    icon: string;
    step: {
      name: string;
    }
  };
}


