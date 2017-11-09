/* tslint:disable: ter-max-len */
import { mockStore } from './../../../core/utils/mocks';
import { mockFlowsApp, mockFlowsState } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { FlowsAppService, FlowsStateService } from './../../services';
import { TestStepComponent } from './test-step.component';

describe('Flows App', () => {

  describe('TestStep Component', () => {
    let component: TestStepComponent;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;
    let state: FlowsStateService;
    let store: any;

    beforeEach(() => {
      utils = new TestUtils();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      store = mockStore;

      component = new TestStepComponent(flowsApp, state);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to "test"', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith('test');
      });

      it('should call onSelectStep() when the current selected step changes', () => {
        spyOn(component, 'onSelectStep');
        component.ngOnInit();
        const step = utils.createStepData();
        store.step.next(step);
        expect(component.onSelectStep).toHaveBeenCalledWith(step);
      });

      it('should call onTestedFlowStep() when the current step is being tested', () => {
        spyOn(component, 'onTestedFlowStep');
        component.ngOnInit();
        const stepTest = 'loading';
        state.testedFlowStep$.next(stepTest);
        expect(component.onTestedFlowStep).toHaveBeenCalledWith(stepTest);
      });
    });

    describe('testStep()', () => {
      it('should test the current selected step with the given payload', () => {
        let spy = spyOn(state, 'testFlowStep');
        flowsApp.step = utils.createStepData();
        const payload = 'test payload';
        component.testStep(payload);
        expect(spy).toHaveBeenCalledWith('1', payload, flowsApp.step.configParams);
      });
    });

    describe('onTestedFlowStep()', () => {
      it('should hide test results while step test is active', () => {
        component.onTestedFlowStep('loading');
        expect(component.showTestResults).toBeFalsy();
      });

      it('should show test results if step test was successful', () => {
        let stepTest = utils.createStepTestData();
        component.onTestedFlowStep(stepTest);
        expect(component.showTestResults).toBeTruthy();
      });

      it('should hide test results if step test was unsuccessful', () => {
        let stepTest = utils.createStepTestData();
        stepTest.tested = false;
        component.onTestedFlowStep(stepTest);
        expect(component.showTestResults).toBeFalsy();
      });
    });
  });
});
