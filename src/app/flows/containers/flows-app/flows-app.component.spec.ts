/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockStore, mockApolloStore, MockMdDialog, MockRouter, mockSnackBar } from './../../../core/utils/mocks';
import { mockFlowsState, mockFlowsApp } from './../../utils/mocks';
import { TestUtils } from './../../utils/test.helpers';
import { FlowsAppComponent } from './flows-app.component';
import { FlowsAppService, FlowsStateService } from './../../services';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

describe('Flows App', () => {

  describe('FlowsApp Component', () => {
    let component: FlowsAppComponent;
    let cd: MockChangeDetectorRef;
    let utils: TestUtils;
    let flowsApp: FlowsAppService;
    let route: ActivatedRoute;
    let router: Router;
    let state: FlowsStateService;
    let store: any;
    let dialog;

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      flowsApp = mockFlowsApp;
      flowsApp.flow = utils.createFlowData();
      route = {} as ActivatedRoute;
      router = <any>new MockRouter();
      state = mockFlowsState;
      store = mockStore;
      dialog = new MockMdDialog();
      component = new FlowsAppComponent(cd, flowsApp, route, router, state, dialog, mockSnackBar);
      expect(component).toBeTruthy();
    });

    // UI
    // - should list all flow steps
    // - should show loading indicator if flow is loading
    // - should show flow header

    xdescribe('Subscriptions', () => {
      let routeParams: Subject<any>;
      let routeEvents: Subject<any>;

      beforeEach(() => {
        // Mock ActiveRoute params and events observables
        routeParams = new Subject<any>();
        route.params = routeParams.asObservable();
        routeEvents = new Subject<any>();
        (router as any).events = routeEvents.asObservable();
      });

      it('should call onFlowRouteChange() when the flowId route param changes', () => {
        const flowId = '1';
        let spy = spyOn(component, 'onFlowRouteChange');
        component.ngOnInit();
        routeParams.next({flowId: flowId});
        expect(spy).toHaveBeenCalledWith(flowId);
      });

      it('should call onStepRouteChange() when the stepId route param changes', () => {
        let spy = spyOn(component, 'onStepRouteChange');
        component.ngOnInit();
        routeEvents.next(new NavigationEnd(1, '/', '/'));
        expect(spy).toHaveBeenCalled();
      });

      it('should call onSelectFlow() when the current selected flow changes', () => {
        let spy = spyOn(component, 'onSelectFlow');
        component.ngOnInit();
        const flow = utils.createFlowData();
        mockApolloStore.flow$.next(flow);
        expect(spy).toHaveBeenCalledWith(flow);
      });

      it('should call onSelectStep() when the current selected step changes', () => {
        let spy = spyOn(component, 'onSelectStep');
        component.ngOnInit();
        const step = utils.createStepData();
        mockStore.step.next(step);
        expect(spy).toHaveBeenCalledWith(step);
      });

      it('should call onStartedFlowRun() when a new flow run got created', () => {
        let spy = spyOn(component, 'onStartedFlowRun');
        component.ngOnInit();
        const flowRun = utils.createFlowRunData();
        state.createdFlowRun$.next(flowRun);
        expect(spy).toHaveBeenCalledWith(flowRun);
      });

      it('should call onTestedFlowStep() when a step got tested', () => {
        let spy = spyOn(component, 'onTestedFlowStep');
        component.ngOnInit();
        const stepTest = utils.createStepTestData();
        state.testedFlowStep$.next(stepTest);
        expect(spy).toHaveBeenCalledWith(stepTest);
      });

      it('should call openTriggerFlowRunDialog() when the dialog got request externally', () => {
        let spy = spyOn(component, 'openTriggerFlowRunDialog');
        component.ngOnInit();
        flowsApp.openTriggerFlowRunDialog$.next(true);
        expect(spy).toHaveBeenCalled();
      });

      it('ngOnDestroy() should unscribe all subscriptions', () => {
        component.ngOnInit();
        let spy = spyOn(component.flowSub$, 'unsubscribe');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onSelectFlow()', () => {
      let flow;

      beforeEach(() => {
        flow = utils.createFlowData();
      });

      it('should call setFlow()', () => {
        let spy = spyOn(flowsApp, 'setFlow');
        component.onSelectFlow(flow);
        expect(spy).toHaveBeenCalledWith(flow);
      });

      it('should call selectRequestedStep()', () => {
        let spy = spyOn(component, 'selectRequestedStep');
        component.onSelectFlow(flow);
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onSelectFlow(flow);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onSelectStep()', () => {
      let step;

      beforeEach(() => {
        step = utils.createStepData();
      });

      it('should set current step in flowsApp', () => {
        let spy = spyOn(flowsApp, 'setStep');
        component.onSelectStep(step);
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onSelectStep(step);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onDeletedFlow()', () => {
      let flow;

      beforeEach(() => {
        flow = {id: '1', name: 'Test flow'};
      });

      it('should hide the loading indicator', () => {
        let spy = spyOn(flowsApp, 'hideStatusMessage');
        component.onDeletedFlow(flow);
        expect(spy).toHaveBeenCalled();
      });

      it('should show status message', () => {
        let spy = spyOn(component, 'showInfoMessage');
        component.onDeletedFlow(flow);
        expect(spy).toHaveBeenCalledWith(`Deleted flow "${flow.name}".`);
      });

      it('should hide the loading indicator', () => {
        let spy = spyOn(router, 'navigate');
        component.onDeletedFlow(flow);
        expect(spy).toHaveBeenCalledWith(['flows']);
      });
    });

    describe('onFlowRouteChange()', () => {
      it('should set the current selected flow to the given flowId', () => {
        let spy = spyOn(state, 'selectFlow');
        component.onFlowRouteChange('1');
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onFlowRouteChange('1');
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onStepRouteChange()', () => {
      let stepId: string = '1';

      beforeEach(() => {
        component.requestedStepId = null;
        // Prepare required active route flow/.../step/1
        (route as any).children = [{
            params: new BehaviorSubject<any>({stepId: stepId}).asObservable(),
        } as ActivatedRoute];
      });

      it('should call selectRequestedStep()', () => {
        let spy = spyOn(component, 'selectRequestedStep');
        component.selectRequestedStep();
        expect(spy).toHaveBeenCalled();
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onStepRouteChange();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('selectRequestedStep()', () => {
      it('should return false if the current flow has no steps', () => {
        const orgSteps = _.cloneDeep(flowsApp.flow.steps);
        flowsApp.flow.steps = [];
        expect(component.selectRequestedStep()).toBeFalsy();
        // Restore original state
        flowsApp.flow.steps = orgSteps;
      });

      it('should select the current requested step and unset requestStepId if it can find the flow step', () => {
        component.requestedStepId = '1';
        let spy = spyOn(state, 'selectStep');
        component.selectRequestedStep();
        expect(spy).toHaveBeenCalled();
        expect(component.requestedStepId).toBeNull();
      });

      it('should not select the current requested step if it cannot find the flow step', () => {
        component.requestedStepId = '999';
        let spy = spyOn(state, 'selectStep');
        component.selectRequestedStep();
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('openTriggerFlowRunDialog()', () => {
      xit('should open a dialog to enter the flow run payload', () => {
      });

      xit('should create and start a flow run upon clicking ok', () => {
      });

      xit('should do nothing upon clicking cancel', () => {
      });
    });

    describe('onStartedFlowRun()', () => {
      let flowRun;

      beforeEach(() => {
        flowRun = utils.createFlowRunData();
      });

      it('should show a loading indicator while the flow is deploying', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onStartedFlowRun('saving');
        expect(spy).toHaveBeenCalledWith('Deploying changes', 'loading');
      });

      it('should show a success message if the flow got deployed successfully', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onStartedFlowRun('saved');
        expect(spy).toHaveBeenCalledWith('Deployed changes', 'success');
      });

      it('should show a loading indicator while the flow is starting', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onStartedFlowRun('loading');
        expect(spy).toHaveBeenCalledWith('Triggering flow', 'loading');
      });

      it('should show a success message if the flow run got started successfully', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onStartedFlowRun(flowRun);
        expect(spy).toHaveBeenCalledWith('Flow successfully triggered');
      });

      it('should show an error message if the flow run did not get started successfully', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        flowRun.status = 'error';
        component.onStartedFlowRun(flowRun);
        expect(spy).toHaveBeenCalledWith(
          jasmine.stringMatching(/An error occured. Flow could not be triggered./),
          'error'
        );
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onStartedFlowRun(flowRun);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('saveFlowDraft', () => {
      it('should create a new flow run', () => {
        let spy = spyOn(flowsApp, 'createFlowRun');
        component.saveFlowDraft();
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('discardFlowDraft', () => {
      it('should restore the flow from the previous flow run', () => {
        expect(component.flowsApp.flow.lastFlowRun).toBeDefined();
        let spy = spyOn(flowsApp, 'restoreFlow');
        let spy2 = spyOn(flowsApp, 'deleteFlow');
        component.discardFlowDraft();
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
      });

      it('should delete the flow if flow has not been deployed before', () => {
        component.flowsApp.flow.lastFlowRun = null;
        let spy = spyOn(flowsApp, 'deleteFlow');
        let spy2 = spyOn(flowsApp, 'restoreFlow');
        let spy3 = spyOn(flowsApp, 'showStatusMessage');
        component.discardFlowDraft();
        expect(spy).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
        expect(spy3).toHaveBeenCalledWith('Deleting flow', 'loading');
        expect(component.disableDraftControls).toBeTruthy();
      });
    });

    describe('onTestedFlowStep()', () => {
      let stepTest;

      beforeEach(() => {
        stepTest = utils.createStepTestData();
      });

      it('should show a loading indicator while the step is being tested', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onTestedFlowStep('loading');
        expect(spy).toHaveBeenCalledWith('Testing step', 'loading');
      });

      it('should show a success message if the step got tested successfully', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        component.onTestedFlowStep(stepTest);
        expect(spy).toHaveBeenCalledWith('Step successfully tested');
      });

      it('should show an error message if the step did not get tested successfully', () => {
        let spy = spyOn(flowsApp, 'showStatusMessage');
        stepTest.tested = false;
        component.onTestedFlowStep(stepTest);
        expect(spy).toHaveBeenCalledWith('Step test was not successful.', 'error');
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onTestedFlowStep(stepTest);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
