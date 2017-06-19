import { Subject } from 'rxjs/Subject';

export const mockApolloStore = {
  flow$: new Subject(),
  task$: new Subject(),
};
