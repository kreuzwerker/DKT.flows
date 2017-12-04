import { AccountsStateService } from './../../services';
import { mockApolloStore } from './../../../core/utils/mocks/apollo-store.mock';
import { mockStore } from './../../../core/utils/mocks/store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { FlowsAppActions } from './../../states';
import {
  Flow,
  Step,
  StepConfigParamsInput,
  Provider,
  Service
} from './../../models';

export const mockAccountsState = {
  // TODO mock properties and methods
} as AccountsStateService;
