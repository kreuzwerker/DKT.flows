/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockStore, mockApolloStore } from './../../../core/utils/mocks';
import { mockTasksState, mockTasksApp, mockTasksApi } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { TasksAppComponent } from './tasks-app.component';
import { TasksAppService, TasksStateService } from './../../services';
import { TaskItem } from './../../models';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

describe('Tasks App', () => {

  describe('TasksApp Component', () => {
    let component: TasksAppComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;
    let tasksApp: TasksAppService;
    let route: ActivatedRoute;
    let router: Router;
    let state: TasksStateService;
    let store: any;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      tasksApp = mockTasksApp;
      tasksApp.tasks = [
        utils.createTaskData('1', 'Test Task 1'),
        utils.createTaskData('2', 'Test Task 2'),
        utils.createTaskData('3', 'Test Task 3'),
      ];

      route = {
        children: []
      } as ActivatedRoute;
      router = {} as Router;
      state = mockTasksState;
      store = mockStore;
      component = new TasksAppComponent(cd, mockTasksApi, tasksApp, route, router, state);
      expect(component).toBeTruthy();
    });

    // UI
    // - should list all task tasks
    // - should show loading indicator if task is loading

    xdescribe('Subscriptions', () => {
      let routeParams: Subject<any>;
      let routeEvents: Subject<any>;

      beforeEach(() => {
        // Mock ActiveRoute params and events observables
        routeParams = new Subject<any>();
        route.params = routeParams.asObservable();
        routeEvents = new Subject<any>();
        router.events = routeEvents.asObservable();
      });

      it('should call onTaskRouteChange() when the taskId route param changes', () => {
        const taskId = '1';
        let spy = spyOn(component, 'onTaskRouteChange');
        component.ngOnInit();
        routeParams.next({taskId: taskId});
        expect(spy).toHaveBeenCalledWith(taskId);
      });

      it('should call selectRequestedTask() when the current selected task changes', () => {
        let spy = spyOn(component, 'selectRequestedTask');
        component.ngOnInit();
        const task = utils.createTaskData();
        mockApolloStore.task$.next(task);
        expect(spy).toHaveBeenCalledWith(task);
      });
    });

    describe('onTaskRouteChange()', () => {
      let taskId: string = '1';

      beforeEach(() => {
        component.requestedTaskId = null;
        // Prepare required active route task/1
        route.params = new BehaviorSubject<any>({taskId: taskId}).asObservable();
      });

      it('should set requestedTaskId to the new taskId param value', () => {
        component.onTaskRouteChange();
        expect(component.requestedTaskId).toEqual(taskId);
      });

      it('should call selectRequestedTask()', () => {
        let spy = spyOn(component, 'selectRequestedTask');
        component.onTaskRouteChange();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('selectRequestedTask()', () => {
      it('should select no task if there are no tasks', () => {
        const orgTasks = _.cloneDeep(tasksApp.tasks);
        tasksApp.tasks = [];
        let spy = spyOn(tasksApp, 'setTask');
        component.selectRequestedTask();
        expect(spy).toHaveBeenCalledWith(null);
        // Restore original state
        tasksApp.tasks = orgTasks;
      });

      it('should select no task and reset the tast item if it cannot find the task', () => {
        component.requestedTaskId = '999';
        let spy = spyOn(tasksApp, 'setTask');
        let spy2 = spyOn(component, 'onLoadTaskItem');
        component.selectRequestedTask();
        expect(spy).toHaveBeenCalledWith(null);
        expect(spy2).toHaveBeenCalledWith(null);
      });

      it('should select the current requested task and load the task item if it can find the task', () => {
        component.requestedTaskId = '1';
        const task = tasksApp.tasks.find(task => task.id === component.requestedTaskId);
        let spy = spyOn(tasksApp, 'setTask');
        let spy2 = spyOn(state, 'loadTaskItem');
        component.selectRequestedTask();
        expect(spy).toHaveBeenCalledWith(task);
        expect(spy2).toHaveBeenCalledWith(task);
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.selectRequestedTask();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('reloadTasks()', () => {
      it('should reload the tasks list', () => {
        let spy = spyOn(state, 'loadTasks');
        component.reloadTasks();
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        const taskItem = utils.createTaskItem();
        let spy = spyOn(cd, 'markForCheck');
        component.onLoadTaskItem(taskItem);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onLoadTaskItem()', () => {
      it('should set the current task item', () => {
        const taskItem = utils.createTaskItem();
        let spy = spyOn(tasksApp, 'setTaskItem');
        component.onLoadTaskItem(taskItem);
        expect(spy).toHaveBeenCalledWith(taskItem);
      });

      it('should trigger change detection', () => {
        const taskItem = utils.createTaskItem();
        let spy = spyOn(cd, 'markForCheck');
        component.onLoadTaskItem(taskItem);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
