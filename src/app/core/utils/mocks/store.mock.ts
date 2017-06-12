import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const mockStore = {
  step: new BehaviorSubject({}),
  provider: new BehaviorSubject({}),
};
