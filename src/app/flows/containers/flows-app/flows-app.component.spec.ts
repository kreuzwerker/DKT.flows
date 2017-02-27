/* tslint:disable: ter-max-len */
import { MockChangeDetectorRef, mockFlowsState, mockFlowsApp, mockStore, mockApolloStore } from './../../utils/mocks';
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

    beforeEach(() => {
      utils = new TestUtils();
      cd = <any>new MockChangeDetectorRef();
      flowsApp = mockFlowsApp;
      route = {} as ActivatedRoute;
      router = {} as Router;
      state = mockFlowsState;
      store = mockStore;
      component = new FlowsAppComponent(cd, flowsApp, route, router, state);
      expect(component).toBeTruthy();
    });

    // UI
    // - should list all flow steps
    // - should show loading indicator if flow is loading
    // - should show flow header

    describe('Subscriptions', () => {
      let routeParams: Subject<any>;
      let routeEvents: Subject<any>;

      beforeEach(() => {
        // Mock ActiveRoute params and events observables
        routeParams = new Subject<any>();
        route.params = routeParams.asObservable();
        routeEvents = new Subject<any>();
        router.events = routeEvents.asObservable();
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

      it('should call onCreatedFlowRun() when a new flow step got created', () => {
        let spy = spyOn(component, 'onCreatedFlowRun');
        component.ngOnInit();
        const flowRun = utils.createFlowRunData();
        state.createdFlowRun$.next(flowRun);
        expect(spy).toHaveBeenCalledWith(flowRun);
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

      it('should set flowsApp.flow', () => {
        component.onSelectFlow(flow);
        expect(flowsApp.flow).toEqual(flow);
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
        route.children = [{
            params: new BehaviorSubject<any>({stepId: stepId}).asObservable(),
        } as ActivatedRoute];
      });

      it('should set requestedStepId to the new stepId param value', () => {
        component.onStepRouteChange();
        expect(component.requestedStepId).toEqual(stepId);
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

      it('should select the current requested step if it can find the flow step', () => {
        component.requestedStepId = '1';
        let spy = spyOn(state, 'dispatch');
        component.selectRequestedStep();
        expect(spy).toHaveBeenCalled();
      });

      it('should not select the current requested step if it cannot find the flow step', () => {
        component.requestedStepId = '999';
        let spy = spyOn(state, 'dispatch');
        component.selectRequestedStep();
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('onCreatedFlowRun()', () => {
      let flowRun;

      beforeEach(() => {
        flowRun = utils.createFlowRunData();
      });

      xit('should show a notification()', () => {
        // component.onCreatedFlowRun(flowRun);
      });

      it('should trigger change detection', () => {
        let spy = spyOn(cd, 'markForCheck');
        component.onCreatedFlowRun(flowRun);
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
