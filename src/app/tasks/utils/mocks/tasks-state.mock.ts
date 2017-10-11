import { TasksStateService } from './../../services';
import { mockApolloStore } from './../../../core/utils/mocks/apollo-store.mock';
import { mockStore } from './../../../core/utils/mocks/store.mock';
import { Subject } from 'rxjs/Subject';
import { Action } from './../../../reducers';
import { TasksAppActions } from './../../states';
import { Task } from './../../models';

export const mockTasksState = {
  select(key: string) {
    return mockStore[key];
  },

  get(key: string) {
    let value;
    mockStore[key].take(1).subscribe(s => value = s);
    return value;
  },

  dispatch(action: Action) { },

  // TODO we don't really want to do it this way..
  // Create mock via class inflection?
  actions: {
    // selectTask(task: Task) { },
  } as TasksAppActions,
} as TasksStateService;
