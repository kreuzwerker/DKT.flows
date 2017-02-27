/* tslint:disable: ter-max-len */
import { FlowHeaderComponent } from './flow-header.component';
import { FlowsAppService } from './../../services';
import { TestUtils } from './../../utils/test.helpers';

describe('Flows App', () => {

  describe('FlowHeader Component', () => {
    let component: FlowHeaderComponent;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;

    beforeEach(() => {
      utils = new TestUtils();
      flowsApp = {
        createFlowRun() {}
      } as FlowsAppService;
      component = new FlowHeaderComponent(flowsApp);
      expect(component).toBeTruthy();
    });

    describe('createFlowRun()', () => {
      it('should create a new flow run', () => {
        let spy = spyOn(flowsApp, 'createFlowRun');
        component.createFlowRun();
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
