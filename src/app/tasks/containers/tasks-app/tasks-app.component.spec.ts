/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockStore, mockApolloStore } from './../../../core/utils/mocks';
import { mockTasksState, mockTasksApp } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { TasksAppComponent } from './tasks-app.component';
import { TasksAppService, TasksStateService } from './../../services';
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

      route = {} as ActivatedRoute;
      router = {} as Router;
      state = mockTasksState;
      store = mockStore;
      component = new TasksAppComponent(cd, tasksApp, route, router, state);
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

      it('should call onSelectTask() when the current selected task changes', () => {
        let spy = spyOn(component, 'onSelectTask');
        component.ngOnInit();
        const task = utils.createTaskData();
        mockApolloStore.task$.next(task);
        expect(spy).toHaveBeenCalledWith(task);
      });
    });

    describe('onSelectTask()', () => {
      let task;

      beforeEach(() => {
        task = utils.createTaskData();
      });

      it('should set current task in tasksApp', () => {
        let spy = spyOn(tasksApp, 'setTask');
        component.onSelectTask(task);
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onSelectTask(task);
        expect(spy).toHaveBeenCalled();
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

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onTaskRouteChange();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('selectRequestedTask()', () => {
      it('should return false if there are no tasks', () => {
        const orgTasks = _.cloneDeep(tasksApp.tasks);
        tasksApp.tasks = [];
        expect(component.selectRequestedTask()).toBeFalsy();
        // Restore original state
        tasksApp.tasks = orgTasks;
      });

      it('should select the current requested task if it can find the task', () => {
        component.requestedTaskId = '1';
        let spy = spyOn(state, 'dispatch');
        component.selectRequestedTask();
        expect(spy).toHaveBeenCalled();
      });

      it('should not select the current requested task if it cannot find the task', () => {
        component.requestedTaskId = '999';
        let spy = spyOn(state, 'dispatch');
        component.selectRequestedTask();
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
