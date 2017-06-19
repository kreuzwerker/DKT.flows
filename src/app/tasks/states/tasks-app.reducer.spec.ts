/* tslint:disable: max-line-length */
import { TestBed } from '@angular/core/testing';
import { TestUtils } from '../utils/test.helpers';
import { TasksAppActions } from './tasks-app.actions';
import { tasksAppReducer } from './tasks-app.reducer';

describe('Tasks App', () => {

  describe('Tasks App Reducer', () => {
    let state;
    let actions;
    let utils;

    beforeEach(() => {
      actions = new TasksAppActions();
      utils = new TestUtils();
    });

    describe('SELECT_TASK action', () => {
      it('should set the current selected task', () => {
        let task = utils.createTaskData();
        state = tasksAppReducer(undefined, actions.selectTask(task));
        expect(state.task).toEqual(task);
      });
    });

  });
});
