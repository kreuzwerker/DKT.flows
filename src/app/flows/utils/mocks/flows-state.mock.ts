import { FlowsStateService } from './../../services';
import { mockStore } from './store.mock'

export const mockFlowsState = {
  select(key: string) {
    return mockStore[key];
  }
} as FlowsStateService;
