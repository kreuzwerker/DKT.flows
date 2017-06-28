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
    case Actions.SELECT_TASK: {
      return Object.assign({}, state, {
        task: payload
      });
    }

    case Actions.UPDATE_TASK: {
      return Object.assign({}, state, {
        task: payload
      });
    }

    default: {
      return state;
    }
  }
}