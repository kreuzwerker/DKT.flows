/* tslint:disable: ter-max-len */
import { MockFlowsApp } from './../../utils/test.helpers';
import { ConfigureStepComponent } from './configure-step.component';
import { FlowsAppService } from './../../services';

describe('Flows App', () => {

  describe('ConfigureStep Component', () => {
    let component: ConfigureStepComponent;
    let flowsApp: FlowsAppService;

    beforeEach(() => {
      flowsApp = MockFlowsApp;
      component = new ConfigureStepComponent(flowsApp);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to "configure"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('configure');
      });
    });
  });
});
