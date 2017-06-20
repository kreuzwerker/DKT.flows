/* tslint:disable: max-line-length */
import { TestUtils } from '../utils/test.helpers';
import { TasksAppService } from './../services';
import { mockFlowsApi } from './../../flows/utils/mocks';
import { TASKS_DATA } from './../services/tasks.data';

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

    describe('loadTask()', () => {
      it('should load the tasks', () => {
        service.loadTasks();
        expect(service.tasks).toEqual(TASKS_DATA);
      });

      it('should sort the tasks', () => {
        let spy = spyOn(service, 'sortTasks');
        service.loadTasks();
        expect(spy).toHaveBeenCalledWith(service.sortingDir);
      });
    });

    describe('setTask()', () => {
      it('should set the current task to the given task', () => {
        const task = utils.createTaskData();
        service.setTask(task);
        expect(service.task).toEqual(task);
      });
    });

    describe('sortTasks()', () => {
      xit('should sort the tasks by state first, by date second', () => {
      });
    });

    describe('setSortingDir()', () => {
      it('should set the current sorting direction to the given value', () => {
        expect(service.sortingDir).toBe('desc');
        service.setSortingDir('asc');
        expect(service.sortingDir).toBe('asc');
      });

      it('should sort the tasks', () => {
        let spy = spyOn(service, 'sortTasks');
        service.setSortingDir('asc');
        expect(spy).toHaveBeenCalledWith(service.sortingDir);
      });
    });
  });
});
