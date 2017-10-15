import { FlowsStateService } from './../../services';
import { mockApolloStore } from './../../../core/utils/mocks/apollo-store.mock';
import { mockStore } from './../../../core/utils/mocks/store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { FlowsAppActions } from './../../states';
import { Step, StepConfigParamsInput, Provider, Service } from './../../models';

export const mockFlowsState = {
  flow$: mockApolloStore.flow$.asObservable(),
  createdFlow$: new Subject<any>(),
  createdFlowRun$: new Subject<any>(),
  testedFlowStep$: new Subject<any>(),

  select(key: string) {
    return mockStore[key];
  },

  get(key: string) {
    let value;
    mockStore[key].take(1).subscribe(s => value = s);
    return value;
  },

  loadFlows(): void { },
  selectFlow(id: string): void { },
  createFlow(name: string, description: string): void { },
  deleteFlow(id: string): void { },
  dispatch(action: Action) { },
  createFlowRun(flowId: string, userId: string): void {},
  startFlowRun(flowRunId: string, payload: Object): void {},
  testFlowStep(stepId: string, payload: String): void {},

  // TODO we don't really want to do it this way..
  // Create mock via class inflection?
  actions: {
    selectStep(step: Step) { },
    selectProvider(provider: Provider) {},
    setStepService(provider: Provider, service: Service) {},
    setStepConfig(configParams: StepConfigParamsInput[]) {},
  } as FlowsAppActions,
} as FlowsStateService;
