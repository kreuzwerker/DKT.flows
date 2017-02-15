import { FlowsStateService } from './../../services';
import { mockApolloStore } from './apollo-store.mock';
import { mockStore } from './store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { FlowsAppActions } from './../../states';
import { Step, Provider, Service } from './../../models';

export const mockFlowsState = {
  flow$: mockApolloStore.flow$.asObservable(),

  select(key: string) {
    return mockStore[key];
  },

  get(key: string) {
    let value;
    mockStore[key].take(1).subscribe(s => value = s);
    return value;
  },

  selectFlow(id: String): void { },
  dispatch(action: Action) { },

  // TODO we don't really want to do it this way..
  // Create mock via class inflection?
  actions: {
    selectStep(step: Step) { },
    selectProvider(provider: Provider) {},
    setStepService(provider: Provider, service: Service) {},
  } as FlowsAppActions,
} as FlowsStateService;
