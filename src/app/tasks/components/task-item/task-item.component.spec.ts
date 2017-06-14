/* tslint:disable: ter-max-len */
import { Task } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import { TaskItemComponent } from './task-item.component';
import { TasksAppService } from './../../services';

describe('Tasks App', () => {
  describe('TaskItem Component', () => {
    let component: TaskItemComponent;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      component = new TaskItemComponent();
      expect(component).toBeTruthy();
    });

    describe('filterByFlow()', () => {
      it('should set a filter for the current task\'s flow', () => {
        let spy = spyOn(component.setFilter, 'emit');
        component.task = utils.createTaskData();
        component.filterByFlow();
        const params = {
          type: 'flowId',
          flowId: component.task.flow.id,
          flowName: component.task.flow.name
        };
        expect(spy).toHaveBeenCalledWith(params);
      });
    });

    describe('filterByType()', () => {
      it('should set a filter for the current task\'s type', () => {
        let spy = spyOn(component.setFilter, 'emit');
        component.task = utils.createTaskData();
        component.filterByType();
        const params = {
          type: 'taskType',
          taskType: component.task.type
        };
        expect(spy).toHaveBeenCalledWith(params);
      });
    });

    describe('truncate()', () => {
      it('should truncate a string with a length of more than 30 characters', () => {
        const str = component.truncate('Lorem ipsum ipsum ipsum ipsum ipsum ipsum ipsum');
        expect(str.length).toEqual(33);
      });
    });
  });
});
