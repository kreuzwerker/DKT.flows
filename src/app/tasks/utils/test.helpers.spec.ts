/* tslint:disable: ter-max-len */
import { TestUtils } from './test.helpers';
import { Task, TaskType, TaskState } from '../models';
import { Step } from './../../flows/models';

describe('Tasks App', () => {

  describe('Test Helpers', () => {
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
    });

    it('should be initialized with default data', () => {
      expect(utils.defaultTaskData).not.toBeNull();
    });

    describe('createTaskData()', () => {
      it('should return a mocked task data object', () => {
        const task = utils.createTaskData();
        expect(task.id).toBe('1');
        expect(task.title).toBe('Test Task');
        expect(task.date).toBe('1491989405');
        expect(task.type).toBe(TaskType.APPROVE);
        expect(task.state).toBe(TaskState.STARTED);
      });
    });

    describe('createTaskItem()', () => {
      it('should return a mocked task item object', () => {
        const taskItem = utils.createTaskItem();
        expect(taskItem.id).toBe('1');
        expect(taskItem.data).toBe('<p>Task item data</p>');
        expect(taskItem.prevStep).toBeDefined();
      });
    });
  });
});
