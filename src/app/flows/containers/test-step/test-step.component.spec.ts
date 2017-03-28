/* tslint:disable: ter-max-len */
import { mockFlowsApp, mockFlowsState, mockStore } from './../../utils/mocks';
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
    });

    describe('testStep()', () => {
      it('should test the current selected step with the given payload', () => {
        let spy = spyOn(state, 'testFlowStep');
        flowsApp.step = utils.createStepData();
        const payload = 'test payload';
        component.testStep(payload);
        expect(spy).toHaveBeenCalledWith('1', payload);
      });
    });
  });
});
