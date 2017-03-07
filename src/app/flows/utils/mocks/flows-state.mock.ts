import { FlowsStateService } from './../../services';
import { mockApolloStore } from './apollo-store.mock';
import { mockStore } from './store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { FlowsAppActions } from './../../states';
import { Step, Provider, Service } from './../../models';

export const mockFlowsState = {
  flow$: mockApolloStore.flow$.asObservable(),
  createdFlow$: new Subject<any>(),
  createdFlowRun$: new Subject<any>(),

  select(key: string) {
    return mockStore[key];
  },

  get(key: string) {
    let value;
    mockStore[key].take(1).subscribe(s => value = s);
    return value;
  },

  selectFlow(id: string): void { },
  createFlow(name: string, description: string): void { },
  deleteFlow(id: string): void { },
  dispatch(action: Action) { },
  createAndStartFlowRun(flowId: string, userId: string, payload: Object): void {},

  // TODO we don't really want to do it this way..
  // Create mock via class inflection?
  actions: {
    selectStep(step: Step) { },
    selectProvider(provider: Provider) {},
    setStepService(provider: Provider, service: Service) {},
  } as FlowsAppActions,
} as FlowsStateService;
