import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as lodash from 'lodash';

import { ApolloQueryResult } from 'apollo-client';
import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { StateService } from './../../core/services';
import { FlowsApiService } from './../services';
import { Flow, FlowData, Step, StepData, StepConfigParamsInput, Provider, Service } from './../models';
import { FlowsAppActions } from './../states';

import { FlowsListData } from './flow.gql';

@Injectable()
export class FlowsStateService extends StateService {
  storeKey = 'flowsApp';

  //
  // App data state
  //

  // All flows list
  flows$: Observable<ApolloQueryResult<FlowsListData>>;
  flowsSub$: Subscription;
  // Current loaded flow
  flow$: Observable<Flow>;
  flowSub$: Subscription;
  // Available providers
  providers$: Observable<Provider[]>;

  //
  // Public events
  //

  createdFlow$: Subject<any> = new Subject<any>();
  deletedFlow$: Subject<any> = new Subject<any>();
  createdFlowRun$: Subject<any> = new Subject<any>();
  testedFlowStep$: Subject<any> = new Subject<any>();

  //
  // Internal events
  //

  // Flag to initiate loading providers
  private loadProviders$: Subject<any> = new Subject<any>();

  constructor(
      private api: FlowsApiService,
      public store: NgRedux<AppState>,
      public actions: FlowsAppActions,
    ) {
    super(store);

    //
    // App data queries
    //

    // Current selected flow
    // ---------------------

    // Fetches flow data reactively as soon as flowId gets set or changes, i.e.
    // DOES NOT fetch flow data when flowId is null or unchanged.

    this.flow$ = this.api.getFlow({
      id: this.select('flowId').filter((flowId) => flowId !== null)
    }).map(({data}) => data.Flow);

    // Providers list
    // --------------

    this.providers$ = this.api.getProviders({
      // NB fake var to hold back the query until we trigger it via this observable
      id: this.loadProviders$
    }).map(({data}) => data && data.allProviders || []);
  }

  //
  // API
  //

  loadFlows(): void {
    // Fetch an up-to-date list of flows
    this.dispatch(this.actions.setLoadingFlows(true));
    this.flows$ = this.api.getFlows().map((response) => {
      // Flatten the data object to array of flows
      const data = response.data && response.data.allFlows ? response.data.allFlows : [];
      // Return the full response including the loading flag
      return Object.assign({}, response, {data: data});
    });

    // Unset loading flows flag
    this.flowsSub$ = this.flows$.subscribe((response) => {
      // The first response will contain cached data. Keep showing the loading
      // indicator until the response contains data fetched via network.
      // NB see getFlows() fetch policy 'cache-and-network' property
      if (!response.loading) {
        this.dispatch(this.actions.setLoadingFlows(false));
        this.flowsSub$.unsubscribe();
      }
    });
  }

  selectFlow(id: string): void {
    if (id === this.get('flowId')) {
      // Requested flow is already selected
      return;
    }

    // Show loading indicator while loading the flow
    this.dispatch(this.actions.setLoadingFlow(true));
    this.flowSub$ = this.flow$.subscribe((flow) => {
      this.dispatch(this.actions.setLoadingFlow(false));
      this.flowSub$.unsubscribe();
    });

    this.dispatch(this.actions.selectFlow(id));
  }

  selectStep(step: Step) {
    this.dispatch(this.actions.selectStep(step));
  }

  createFlow(flow: Flow): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.createFlow(flow).subscribe((flow) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      this.createdFlow$.next(flow);
    });
  }

  deleteFlow(id: string, name: string): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.deleteFlow({
      flowId: id,
    }).subscribe((_step) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      this.deletedFlow$.next({id: id, name: name});
    });
  }

  restoreFlow(id: string): void {
    this.createdFlowRun$.next('restoring');
    this.api.restoreFlow({
      flowId: id,
    }).subscribe((_step) => {
      this.createdFlowRun$.next('restored');
    });
  }

  saveFlow(id: string, flow: FlowData): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
  }

  saveFlowStep(flowId: string, stepId: string, step: StepData): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));

    // Remove the __typename property before making the API request
    const configParams = step.configParams && step.configParams.map(
      (param) => lodash.omit(param, ['__typename']) as StepConfigParamsInput
    ) || null;
    const _step = Object.assign({}, step, {
      configParams: configParams,
    });

    this.api.updateStep(flowId, _step).subscribe((_step) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      obs$.next(_step);
    });

    return obs$;
  }

  addFlowStep(flowId: string, step: Step): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.addFlowStep(flowId, step).subscribe((_step) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      obs$.next(_step);
    });

    return obs$;
  }

  removeFlowStep(flowId: string, step: Step) {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.removeFlowStep(flowId, step).subscribe((data) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
    });
  }

  loadProviders(): void {
    // Show loading indicator while loading providers
    this.dispatch(this.actions.setLoadingProviders(true));
    this.providers$.subscribe((providers) => this.dispatch(
      this.actions.setLoadingProviders(false)
    ) );

    // Trigger loading the providers
    this.loadProviders$.next(1);
  }

  createFlowRun(flowId: string, userId: string): void {
    this.createdFlowRun$.next('saving');
    this.api.createFlowRun(flowId, userId).subscribe((flowRun) => {
      // ISSUE: API returns flowRun.flow.__typename=FlowMirrorType. Hence Apollo
      // can't automatically update the Flow store object.
      // -> waiting for Johannes: why do we have *MirrorType?
      this.createdFlowRun$.next('saved');
    }, (error) => console.log('ERROR', error));
  }

  startFlowRun(flowRunId: string, payload: Object): void {
    this.createdFlowRun$.next('loading');
    this.api.startFlowRun(flowRunId, payload).subscribe((flowRun) => {
      this.createdFlowRun$.next(flowRun);
    }, (error) => this.createdFlowRun$.next(error));
  }

  testFlowStep(stepId: string, payload: String): void {
    this.testedFlowStep$.next('loading');
    this.api.testFlowStep(stepId, payload).subscribe((test) => {
      this.testedFlowStep$.next(test);
    }, (error) => this.testedFlowStep$.next(error));
  }
}
