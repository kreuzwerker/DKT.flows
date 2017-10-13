import { AppState, Action, Selector } from '../../reducers';
import { TasksAppActions as Actions } from './tasks-app.actions';
import { Task } from '../models';

export interface TasksAppState {
  task: Task;
}

const initialState: TasksAppState = {
  task: null,
};

export function tasksAppReducer(state = initialState, {type, payload}: Action): TasksAppState {
  switch (type) {

    /**
     * Flags
     */

    case Actions.SET_LOADING_TASKS: {
      return Object.assign({}, state, {
        loadingTasks: payload
      });
    }

    case Actions.SET_LOADING_TASK_ITEM: {
      return Object.assign({}, state, {
        loadingTaskItem: payload
      });
    }

    default: {
      return state;
    }
  }
}
