/* tslint:disable: ter-max-len */
import { mockFlowsApp } from './../../utils/mocks';
import { TestStepComponent } from './test-step.component';
import { FlowsAppService } from './../../services';

describe('Flows App', () => {

  describe('TestStep Component', () => {
    let component: TestStepComponent;
    let flowsApp: FlowsAppService;

    beforeEach(() => {
      flowsApp = mockFlowsApp;
      component = new TestStepComponent(flowsApp);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to "test"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('test');
      });
    });
  });
});
