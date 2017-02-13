/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockFlowsApp, mockFlowsState } from './../../utils/test.helpers';
import { SelectServiceComponent } from './select-service.component';
import { FlowsAppService, FlowsStateService } from './../../services';

describe('Flows App', () => {

  describe('SelectService Component', () => {
    let component: SelectServiceComponent;
    let cd: MockChangeDetectorRef;
    let flowsApp: FlowsAppService;
    let state: FlowsStateService;

    beforeEach(() => {
      cd = <any>new MockChangeDetectorRef();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      component = new SelectServiceComponent(cd, flowsApp, state);
      expect(component).toBeTruthy();
    });

    // UI
    // - on select service OR flow step has a service selected:
    //   - should show current selected service in right sidebar
    //   - should show the flow step config navigation
    // - step has no service selected:
    //   - should hide right sidebar

    describe('ngOnInit()', () => {
      xit('should set current step preparation stage to "select"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('select');
      });

      xit('should call onSelectStep() when the current selected step changes', () => {
      });
    });

    describe('onSelectStep()', () => {
      xit('should set the current selected service if the given step has a service set', () => {
      });

      xit('should set the current selected service to null if the given step no service set', () => {
      });

      xit('should set the current selectable type to Trigger if the given step is the first flow step', () => {
      });

      xit('should set the current selectable type to Action if the given step is not the first flow step', () => {
      });

      xit('should trigger change detection', () => {
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });
  });
});
