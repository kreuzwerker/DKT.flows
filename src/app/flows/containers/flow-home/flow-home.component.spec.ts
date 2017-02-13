/* tslint:disable: ter-max-len */
import { mockFlowsApp } from './../../utils/test.helpers';
import { FlowHomeComponent } from './flow-home.component';
import { FlowsAppService } from './../../services';

describe('Flows App', () => {

  describe('FlowHome Component', () => {
    let component: FlowHomeComponent;
    let flowsApp: FlowsAppService;

    beforeEach(() => {
      flowsApp = mockFlowsApp;
      component = new FlowHomeComponent(flowsApp);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to null', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith(null);
      });
    });
  });
});
