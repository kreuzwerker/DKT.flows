/* tslint:disable: ter-max-len */
import { FlowHeaderComponent } from './flow-header.component';
import { FlowsAppService } from './../../services';
import { TestUtils } from './../../utils/test.helpers';
import { mockFlowsApp } from './../../utils/mocks';
import { Flow } from './../../models';

describe('Flows App', () => {

  describe('FlowHeader Component', () => {
    let component: FlowHeaderComponent;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;
    let flow: Flow;

    beforeEach(() => {
      utils = new TestUtils();
      component = new FlowHeaderComponent(mockFlowsApp);
      expect(component).toBeTruthy();
      component.flow = utils.createFlowData();
    });

    describe('isManualFlowRunLocked()', () => {
      it('should return false if the current flow is executable', () => {
        expect(component.isManualFlowRunLocked()).toBeFalsy();
      });

      it('should return true if the current flow is not executable', () => {
        component.flow.steps = [];
        expect(component.isManualFlowRunLocked()).toBeTruthy();
      });
    });
  });
});
