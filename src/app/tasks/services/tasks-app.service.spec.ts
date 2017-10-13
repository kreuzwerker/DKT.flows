/* tslint:disable: max-line-length */
import { TestUtils } from '../utils/test.helpers';
import { TasksAppService } from './../services';
import { mockTasksApi, mockTasksState } from './../utils/mocks';
import { mockFlowsApi } from './../../flows/utils/mocks';
import { MockRouter } from './../../core/utils/mocks';
import { TASKS_DATA } from './../services/tasks.data';

describe('Tasks App', () => {

  xdescribe('TasksApp Service', () => {
    let utils;
    let service;
    let router;

    beforeEach(() => {
      // TODO a working Flows API mock: getFlows() isn't mocked properly, breaking
      // instantiation of TasksAppService
      router = <any>new MockRouter();
      service = new TasksAppService(mockTasksApi, mockFlowsApi, router, mockTasksState);
      utils = new TestUtils();
    });

    describe('onRouteChange()', () => {
      xit('should store the current task child route', () => {
      });
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

    describe('goToTaskRoute()', () => {
      it('should navigate to the given task\'s route and keep the current child route', () => {
      service.currentTaskRoute = 'description';
      let task = utils.createTaskData();
      let path = ['tasks', task.id, 'description'];
      let spy = spyOn(router, 'navigate');
      service.goToTaskRoute(task);
      expect(spy).toHaveBeenCalledWith(path);
      });
    });

    describe('isActiveTask()', () => {
      it('should correctly determine if the given task is the current set task', () => {
        let task = utils.createTaskData();
        service.setTask(task);
        expect(service.isActiveTask(task)).toBeTruthy();
        task = utils.createTaskData('2');
        expect(service.isActiveTask(task)).toBeFalsy();
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
