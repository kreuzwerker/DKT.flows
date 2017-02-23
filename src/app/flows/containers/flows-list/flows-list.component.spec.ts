/* tslint:disable: ter-max-len */
import { mockFlowsState } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { FlowsListComponent } from './flows-list.component';
import { FlowsStateService } from './../../services';

describe('Flows App', () => {

  describe('FlowsList Component', () => {
    let component: FlowsListComponent;
    let utils: TestUtils;
    let state: FlowsStateService;

    beforeEach(() => {
      utils = new TestUtils();
      state = mockFlowsState;
      component = new FlowsListComponent(state);
      expect(component).toBeTruthy();
    });

    describe('createFlow()', () => {
      it('should create a new flow with the given name and description', () => {
        let spy = spyOn(state, 'createFlow');
        let name = 'new flow name'
        let description = 'new flow description'
        component.createFlow(name, description);
        expect(spy).toHaveBeenCalledWith(name, description);
      });
    });

    describe('deleteFlow()', () => {
      it('should delete the given flow.', () => {
        let spy = spyOn(state, 'deleteFlow');
        let id = '1'
        component.deleteFlow(id);
        expect(spy).toHaveBeenCalledWith(id);
      });
    });
  });
});
