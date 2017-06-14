/* tslint:disable: ter-max-len */
import { Task } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import { TasksFilterComponent } from './tasks-filter.component';

describe('Tasks App', () => {
  describe('TasksFilter Component', () => {
    let component: TasksFilterComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new TasksFilterComponent();
      expect(component).toBeTruthy();
    });

    describe('toggleSortingDir()', () => {
      it('should change the sorting direction and emit a change event', () => {
        let spy = spyOn(component.sortingDirChange, 'emit');
        component.sortingDir = 'asc';
        component.toggleSortingDir();
        expect(spy).toHaveBeenCalledWith('desc');
      });
    });

    describe('getFilterLabel()', () => {
      xit('should generate a filter label for the given flow filter', () => {
      });
      xit('should generate a filter label for the given task filter', () => {
      });
      xit('should truncate a filter label for the given flow filter', () => {
      });
    });
  });
});
