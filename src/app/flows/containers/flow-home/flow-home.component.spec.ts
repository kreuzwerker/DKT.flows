/* tslint:disable: ter-max-len */
import { mockFlowsApp, mockFlowsState, mockApolloStore, MockChangeDetectorRef } from './../../utils/mocks';
import { FlowHomeComponent } from './flow-home.component';
import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, FlowState } from './../../models';
import { TestUtils } from './../../utils/test.helpers';
import * as flowHelpers from './../../utils/flow.helpers';

describe('Flows App', () => {

  describe('FlowHome Component', () => {
    let component: FlowHomeComponent;
    let cd: MockChangeDetectorRef;
    let flowsApp: FlowsAppService;
    let state: FlowsStateService;
    let utils: TestUtils;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      flowsApp = mockFlowsApp;
      state = mockFlowsState;
      component = new FlowHomeComponent(cd, flowsApp, state);
      expect(component).toBeTruthy();
    });

    describe('ngOnInit()', () => {
      it('should set current step preparation stage to null', () => {
        spyOn(flowsApp, 'setStepStage');
        component.ngOnInit();
        expect(flowsApp.setStepStage).toHaveBeenCalledWith(null);
      });

      it('should call onSelectFlow() when the current selected flow changes', () => {
        let spy = spyOn(component, 'onSelectFlow');
        component.ngOnInit();
        const flow = utils.createFlowData();
        mockApolloStore.flow$.next(flow);
        expect(spy).toHaveBeenCalledWith(flow);
      });

      it('should call onCreatedFlowRun() when a new flow run got created', () => {
        let spy = spyOn(component, 'onCreatedFlowRun');
        component.ngOnInit();
        const flowRun = utils.createFlowRunData();
        state.createdFlowRun$.next(flowRun);
        expect(spy).toHaveBeenCalledWith(flowRun);
      });
    });

    describe('ngOnDestroy()', () => {
      it('should unscribe all subscriptions', () => {
        component.ngOnInit();
        let spy = spyOn(component.flowSub$, 'unsubscribe');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onSelectFlow()', () => {
      it('should set the info box with the appropiate contents for the given flow state', () => {
        let flowRun = utils.createFlowRunData();
        let spy = spyOn(component, 'setInfoBoxContents');
        let flow = utils.createFlowData();
        let state = flowHelpers.getFlowState(flow);
        component.onSelectFlow(flow);
        expect(spy).toHaveBeenCalledWith(state, flow);
      });
    });

    describe('onCreatedFlowRun()', () => {
      it('should set the info box contents to TRIGGERED state if flow run is running', () => {
        let flowRun = utils.createFlowRunData();
        let spy = spyOn(component, 'setInfoBoxContents');
        flowRun.status = 'running';
        component.onCreatedFlowRun(flowRun);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('setInfoBoxContents()', () => {
      let flow: Flow;

      beforeEach(() => {
        flow = utils.createFlowData();
      });

      it('should set the info box with the appropriate contents for the MISSING_TRIGGER state', () => {
        component.setInfoBoxContents(FlowState.MISSING_TRIGGER, flow);
        expect(component.infoBoxMessage).toEqual('Please add a trigger.');
      });

      it('should set the info box with the appropriate contents for the UNFINISHED_TRIGGER state', () => {
        component.setInfoBoxContents(FlowState.UNFINISHED_TRIGGER, flow);
        expect(component.infoBoxMessage).toEqual('Please finish configuring the Trigger.');
      });

      it('should set the info box with the appropriate contents for the MISSING_ACTION state', () => {
        component.setInfoBoxContents(FlowState.MISSING_ACTION, flow);
        expect(component.infoBoxMessage).toEqual('This Flow requires at least one more action to be successfully configured.');
      });

      it('should set the info box with the appropriate contents for the UNFINISHED_ACTION state', () => {
        component.setInfoBoxContents(FlowState.UNFINISHED_ACTION, flow);
        expect(component.infoBoxMessage).toEqual('Please finish configuring an action.');
      });

      it('should set the info box with the appropriate contents for the NOT_ACTIVATED state', () => {
        component.setInfoBoxContents(FlowState.NOT_ACTIVATED, flow);
        expect(component.infoBoxMessage).toEqual('This flow has been successfully configured and tested.');
      });

      it('should set the info box with the appropriate contents for the NOT_TRIGGERED state', () => {
        component.setInfoBoxContents(FlowState.NOT_TRIGGERED, flow);
        expect(component.infoBoxMessage).toEqual('This flow has been successfully activated and is ready to be triggered.');
      });

      it('should set the info box with the appropriate contents for the TRIGGERED state', () => {
        component.setInfoBoxContents(FlowState.TRIGGERED, flow);
        expect(component.infoBoxMessage).toEqual('This flow has been successfully triggered and is now running.');
      });
    });
  });
});
