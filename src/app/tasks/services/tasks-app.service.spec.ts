/* tslint:disable: max-line-length */
import { TestUtils } from '../utils/test.helpers';
import { TasksAppService } from './../services';
import { mockFlowsApi } from './../../flows/utils/mocks';

describe('Tasks App', () => {

  xdescribe('TasksApp Service', () => {
    let utils;
    let service;

    beforeEach(() => {
      // TODO a working Flows API mock: getFlows() isn't mocked properly, breaking
      // instantiation of TasksAppService
      service = new TasksAppService(mockFlowsApi);
      utils = new TestUtils();
    });

    describe('setTask()', () => {
      it('should set the current task to the given task', () => {
        const task = utils.createTaskData();
        service.setTask(task);
        expect(service.task).toEqual(task);
      });
    });
  });
});
