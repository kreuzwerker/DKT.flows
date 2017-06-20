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

    describe('filterFilters()', () => {
      it('should return an array of filters that match the given string', () => {
        component.filtersList = utils.createTaskFiltersData();
        const filtersList = component.filterFilters('type');
        expect(filtersList.length).toBe(3);
      });
    });

    describe('selectFilter()', () => {
      it('should set the given filter and clear the search field', () => {
        let spy = spyOn(component.setFilter, 'emit');
        const filter = utils.createTaskTypeFilterData();
        const event = {isUserInput: true};
        component.selectFilter(event, filter);
        expect(spy).toHaveBeenCalledWith(filter);
        expect(component.filterCtrl.value).toEqual('');
      });

      it('should not set the given filter if the change was not triggered by the user', () => {
        let spy = spyOn(component.setFilter, 'emit');
        const filter = utils.createTaskTypeFilterData();
        const event = {isUserInput: false};
        component.selectFilter(event, filter);
        expect(spy).not.toHaveBeenCalledWith(filter);
      });
    });

    describe('toggleSortingDir()', () => {
      it('should change the sorting direction and emit a change event', () => {
        let spy = spyOn(component.setSortingDir, 'emit');
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
