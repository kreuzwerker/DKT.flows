import { FlowsStateService } from './../../services';
import { mockApolloStore } from './apollo-store.mock';
import { mockStore } from './store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { FlowsAppActions } from './../../states';
import { Step } from './../../models';

export const mockFlowsState = {
  flow$: mockApolloStore.flow$.asObservable(),

  select(key: string) {
    return mockStore[key];
  },

  selectFlow(id: String): void { },
  dispatch(action: Action) { },

  // TODO we don't want to do this really...
  actions: {
    selectStep(step: Step) { }
  } as FlowsAppActions,
} as FlowsStateService;
