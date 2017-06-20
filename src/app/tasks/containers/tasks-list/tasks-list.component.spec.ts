/* tslint:disable: ter-max-len */
import { SimpleChange } from '@angular/core';
import { Task } from './../../models';
import { TasksListComponent } from './tasks-list.component';
import { TestUtils } from './../../utils/test.helpers';
import { MockChangeDetectorRef } from './../../../core/utils/mocks';
import { mockTasksApp } from './../../utils/mocks';
import { TasksAppService } from './../../services';

describe('Tasks App', () => {
  describe('TasksList Component', () => {
    let component: TasksListComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;
    let tasksApp: TasksAppService;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      tasksApp = mockTasksApp;
      component = new TasksListComponent(cd, tasksApp);
      expect(component).toBeTruthy();
    });

    it('should correctly initialize properties', () => {
      expect(component.tasksInProgress).toEqual([]);
      expect(component.tasksMisc).toEqual([]);
    });

    describe('ngOnChanges()', () => {
      it('should call splitTasks() when tasks change', () => {
        spyOn(component, 'splitTasks');
        spyOn(cd, 'markForCheck');
        const tasks = utils.createTasksListData();
        component.ngOnChanges({ tasks: new SimpleChange(null, tasks, true)});
        expect(component.splitTasks).toHaveBeenCalled();
        expect(cd.markForCheck).toHaveBeenCalled();
      });
    });

    describe('ngOnInit()', () => {
      it('should split the task lists', () => {
        let spySplit = spyOn(component, 'splitTasks');
        component.ngOnInit();
        expect(spySplit).toHaveBeenCalled();
      });
    });

    describe('splitTasks()', () => {
      it('should split the given tasks into in-progress and miscellaneous tasks', () => {
        component.tasks = utils.createTasksListData();
        expect(component.tasksInProgress).toEqual([]);
        expect(component.tasksMisc).toEqual([]);
        component.splitTasks();
        expect(component.tasksInProgress.length).toEqual(3);
        expect(component.tasksMisc.length).toEqual(2);
      });
    });
  });
});
