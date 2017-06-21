/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import * as helpers from './task.helpers';
import { Task, TaskType, TaskStateType } from './../models';

describe('Tasks App', () => {

  describe('Task Helpers', () => {
    let task: Task;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      task = utils.createTaskData();
    });

    describe('getTaskStateType()', () => {
      it('should return the task state type for the given task', () => {
        task.type = TaskType.APPROVE;
        let type = helpers.getTaskStateType(task);
        expect(type).toBe(TaskStateType.APPROVE);
        task.type = TaskType.REVIEW;
        type = helpers.getTaskStateType(task);
        expect(type).toBe(TaskStateType.REVIEW);
        task.type = TaskType.CORRECT;
        type = helpers.getTaskStateType(task);
        expect(type).toBe(TaskStateType.TRANSITIONAL);
      });
    });
  });
});
