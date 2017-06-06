import { AppState, Action, Selector } from '../../reducers';
import { TasksAppActions as Actions } from './tasks-app.actions';

export interface TasksAppState {
  task: any;
}

const initialState: TasksAppState = {
  task: null,
};

export function tasksAppReducer(state = initialState, {type, payload}: Action): TasksAppState {
  return state;
}
