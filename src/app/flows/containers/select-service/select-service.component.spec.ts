/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockStore } from './../../../core/utils/mocks';
import { mockFlowsApp, mockFlowsState } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { ServiceType } from './../../models';
import { SelectServiceComponent } from './select-service.component';
import { FlowsAppService, FlowsStateService } from './../../services';

describe('Flows App', () => {

  describe('SelectService Component', () => {
    let component: SelectServiceComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;
    let state: FlowsStateService;
    let store: any;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      store = mockStore;
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
      it('should set current step preparation stage to "select"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('select');
      });

      it('should call onSelectStep() when the current selected step changes', () => {
        spyOn(component, 'onSelectStep');
        component.ngOnInit();
        const step = utils.createServiceData();
        store.step.next(step);
        expect(component.onSelectStep).toHaveBeenCalledWith(step);
      });
    });

    describe('onSelectStep()', () => {
      let step;

      beforeEach(() => {
        step = utils.createStepData();
      });

      it('should set the current selected service if the given step has a service set', () => {
        component.onSelectStep(step);
        expect(component.selectedService).toEqual(step.service);
      });

      it('should set the current selected service to null if the given step has no service set', () => {
        step.service = undefined;
        component.onSelectStep(step);
        expect(component.selectedService).toBeNull();
      });

      it('should set the current selectable type to Trigger if the given step is the first flow step', () => {
        step.position = 0;
        component.onSelectStep(step);
        expect(component.selectableServiceType).toBe(ServiceType.TRIGGER);
      });

      it('should set the current selectable type to Action if the given step is not the first flow step', () => {
        step.position = 1;
        component.onSelectStep(step);
        expect(component.selectableServiceType).toBe(ServiceType.ACTION);
      });

      it('should trigger change detection', () => {
        spyOn(cd, 'markForCheck');
        component.onSelectStep(step);
        expect(cd.markForCheck).toHaveBeenCalled();
      });
    });

    describe('onContinue()', () => {
      it('should save the step upon continuing the flow configuration process if the selected service has changed', () => {
        component.changedSelectedService = true;
        let spy = spyOn(flowsApp, 'saveFlowStep');
        component.onContinue();
        expect(spy).toHaveBeenCalled();
        expect(component.changedSelectedService).toBeFalsy();
      });

      it('should not save the step upon continuing the flow configuration process if the selected service has not changed', () => {
        component.changedSelectedService = false;
        let spy = spyOn(flowsApp, 'saveFlowStep');
        component.onContinue();
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('ngOnDestroy()', () => {
      xit('should unscribe all subscriptions', () => {
      });
    });
  });
});
