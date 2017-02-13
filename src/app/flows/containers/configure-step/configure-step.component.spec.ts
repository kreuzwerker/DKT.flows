/* tslint:disable: ter-max-len */
import { TestUtils } from './../../utils/test.helpers';
import { ConfigureStepComponent } from './configure-step.component';
import { FlowsAppService } from './../../services';

describe('Flows App', () => {

  describe('ConfigureStep Component', () => {
    let component: ConfigureStepComponent;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;

    beforeEach(() => {
      utils = new TestUtils();
      flowsApp = {
        setStepStage(stage: string): void { }
      } as FlowsAppService
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
