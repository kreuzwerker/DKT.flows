/* tslint:disable: ter-max-len */
import { mockFlowsState } from './../../utils/mocks';
import { MockRouter } from '../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { FlowsListComponent } from './flows-list.component';
import { FlowsStateService } from './../../services';

describe('Flows App', () => {

  describe('FlowsList Component', () => {
    let component: FlowsListComponent;
    let utils: TestUtils;
    let state: FlowsStateService;
    let router;

    beforeEach(() => {
      utils = new TestUtils();
      state = mockFlowsState;
      router = <any>new MockRouter();
      component = new FlowsListComponent(state, router);
      expect(component).toBeTruthy();
    });

    describe('createFlow()', () => {
      it('should create a new flow with the given name and description', () => {
        let spy = spyOn(state, 'createFlow');
        let name = 'new flow name';
        let description = 'new flow description';
        component.createFlow(name, description);
        expect(spy).toHaveBeenCalledWith(name, description);
      });
    });

    describe('onCreatedFlow()', () => {
      it('should navigate to select a trigger service for the new flow.', () => {
        spyOn(component.router, 'navigate');
        const flow = utils.createFlowData();
        component.onCreatedFlow(flow);
        const route = ['flows', flow.id, 'steps', flow.steps[0].id, 'select-service'];
        expect(component.router.navigate).toHaveBeenCalledWith(route);
      });
    });

    describe('deleteFlow()', () => {
      it('should delete the given flow.', () => {
        let spy = spyOn(state, 'deleteFlow');
        let id = '1';
        component.deleteFlow(id);
        expect(spy).toHaveBeenCalledWith(id);
      });
    });
  });
});
