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
      it('should call sortTasks() when the sorting direction input changes', () => {
        spyOn(component, 'sortTasks');
        spyOn(cd, 'markForCheck');
        const sortingDir = 'asc';
        component.ngOnChanges({ sortingDir: new SimpleChange(null, sortingDir, true)});
        expect(component.sortTasks).toHaveBeenCalledWith(sortingDir);
        expect(cd.markForCheck).toHaveBeenCalled();
      });
    });

    describe('ngOnInit()', () => {
      it('should split and sort the task lists', () => {
        let spySplit = spyOn(component, 'splitTasks');
        let spySort = spyOn(component, 'sortTasks');
        component.ngOnInit();
        expect(spySplit).toHaveBeenCalled();
        expect(spySort).toHaveBeenCalledWith(component.sortingDir);
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

    describe('sortTasks()', () => {
      it('should sort the given tasks in the given direction', () => {
        component.tasks = utils.createTasksListData();
        component.splitTasks();
        component.sortTasks('asc');
        expect(component.tasksInProgress[0].id).toBe('1');
        expect(component.tasksMisc[0].id).toBe('4');
        component.sortTasks('desc');
        expect(component.tasksInProgress[0].id).toBe('3');
        expect(component.tasksMisc[0].id).toBe('5');
      });
    });
  });
});
