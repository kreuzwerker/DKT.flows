import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as lodash from 'lodash';

import { ApolloQueryResult } from 'apollo-client';
import { ApolloQueryObservable } from 'apollo-angular';
import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { StateService } from './../../core/services';
import { FlowsApiService } from './../services';
import {
  Flow,
  FlowData,
  Step,
  StepData,
  StepConfigParamsInput,
  Provider,
  Service
} from './../models';
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
  // Flow logs
  flowLogsQuery$: ApolloQueryObservable<any>;
  flowLogs$: Observable<Flow[]>;
  // Available providers
  providers$: Observable<Provider[]>;

  //
  // Public events
  //

  createdFlow$: Subject<any> = new Subject<any>();
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
    public actions: FlowsAppActions
  ) {
    super(store);

    //
    // App data queries
    //

    // Current selected flow
    // ---------------------

    // Fetches flow data reactively as soon as flowId gets set or changes, i.e.
    // DOES NOT fetch flow data when flowId is null or unchanged.

    this.flow$ = this.api
      .getFlow({
        id: this.select('flowId').filter(flowId => flowId !== null)
      })
      .map(({ data }) => data.Flow);

    // Providers list
    // --------------

    this.providers$ = this.api
      .getProviders({
        // NB fake var to hold back the query until we trigger it via this observable
        id: this.loadProviders$
      })
      .map(({ data }) => (data && data.allProviders) || []);
  }

  //
  // API
  //

  loadFlows(): void {
    // Fetch an up-to-date list of flows
    this.dispatch(this.actions.setLoadingFlows(true));
    this.flows$ = this.api.getFlows().map(response => {
      // Flatten the data object to array of flows
      const data =
        response.data && response.data.allFlows ? response.data.allFlows : [];
      // Return the full response including the loading flag
      return Object.assign({}, response, { data: data });
    });

    // Unset loading flows flag
    this.flowsSub$ = this.flows$.subscribe(response => {
      // The first response will contain cached data. Keep showing the loading
      // indicator until the response contains data fetched via network.
      // NB see getFlows() fetch policy 'cache-and-network' property
      if (!response.loading) {
        this.dispatch(this.actions.setLoadingFlows(false));
        this.flowsSub$.unsubscribe();
      }
    });
  }

  loadFlowLogs(
    flowId: string,
    offset: number,
    limit: number,
    status: string
  ): void {
    // Show loading indicator while loading providers
    this.dispatch(this.actions.setLoadingFlowLogs(true));

    this.flowLogsQuery$ = this.api.getFlowLogs(flowId, offset, limit, status);
    this.flowLogs$ = this.flowLogsQuery$.map(({ data }) => data.Flow);

    const flowLogsSub$ = this.flowLogs$.subscribe(providers => {
      this.dispatch(this.actions.setLoadingFlowLogs(false));
      flowLogsSub$.unsubscribe();
    });
  }

  fetchMoreLogs(offset: number = 0) {
    // Show loading indicator while loading providers
    this.dispatch(this.actions.setLoadingFlowLogs(true));

    this.flowLogsQuery$
      .fetchMore({
        variables: {
          offset: offset
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            Flow: Object.assign({}, prev.Flow, {
              runs: fetchMoreResult.Flow.runs
            })
          };
        }
      })
      .then(flow => {
        this.dispatch(this.actions.setLoadingFlowLogs(false));
      })
      .catch(err => {
        this.dispatch(this.actions.setLoadingFlowLogs(false));
      });
  }

  selectFlow(id: string): void {
    if (id === this.get('flowId')) {
      // Requested flow is already selected
      return;
    }

    // Show loading indicator while loading the flow
    this.dispatch(this.actions.setLoadingFlow(true));
    this.flowSub$ = this.flow$.subscribe(flow => {
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
    this.api.createFlow(flow).subscribe(
      flow => {
        this.dispatch(this.actions.setSavingFlow(false, true));
        this.createdFlow$.next(flow);
      },
      err => {
        this.dispatch(this.actions.setSavingFlow(false, true));
      }
    );
  }

  deleteFlow(id: string): Observable<any> {
    return this.api.deleteFlow({
      flowId: id
    });
  }

  restoreFlow(id: string): void {
    this.createdFlowRun$.next('restoring');
    this.api
      .restoreFlow({
        flowId: id
      })
      .subscribe(_step => {
        this.createdFlowRun$.next('restored');
      });
  }

  saveFlow(flow: FlowData): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.updateFlow(flow).subscribe(_step => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      obs$.next(flow);
    });

    return obs$;
  }

  toggleFlowActivation(flow: Flow): void {
    this.saveFlow(
      Object.assign({}, flow, {
        active: !flow.active
      })
    );
  }

  saveFlowStep(
    flowId: string,
    stepId: string,
    step: StepData
  ): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));

    const _step = Object.assign({}, step, {
      configParams: this.sanitizeStepConfigParams(step.configParams)
    });

    this.api.updateStep(flowId, _step).subscribe(_step => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      obs$.next(_step);
    });

    return obs$;
  }

  addFlowStep(flow: Flow, step: Step): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.addFlowStep(flow, step).subscribe(
      _step => {
        this.dispatch(this.actions.setSavingFlow(false, true));
        obs$.next(_step);
      },
      err => {
        this.dispatch(this.actions.setSavingFlow(false, true));
      }
    );

    return obs$;
  }

  removeFlowStep(flow: Flow, step: Step) {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.removeFlowStep(flow, step).subscribe(
      data => {
        this.dispatch(this.actions.setSavingFlow(false, true));
      },
      err => {
        this.dispatch(this.actions.setSavingFlow(false, true));
      }
    );
  }

  loadProviders(): void {
    // Show loading indicator while loading providers
    this.dispatch(this.actions.setLoadingProviders(true));
    this.providers$.subscribe(
      providers => this.dispatch(this.actions.setLoadingProviders(false)),
      err => {
        this.dispatch(this.actions.setLoadingProviders(false));
      }
    );

    // Trigger loading the providers
    this.loadProviders$.next(1);
  }

  createFlowRun(flowId: string, userId: string): void {
    this.createdFlowRun$.next('saving');
    this.api.createFlowRun(flowId, userId).subscribe(
      flowRun => {
        this.createdFlowRun$.next('saved');
      },
      error => console.log('ERROR', error)
    );
  }

  startFlowRun(flowRunId: string, payload: Object): void {
    this.createdFlowRun$.next('loading');
    this.api.startFlowRun(flowRunId, payload).subscribe(
      flowRun => {
        this.createdFlowRun$.next(flowRun);
      },
      error => this.createdFlowRun$.next(error)
    );
  }

  testFlowStep(
    stepId: string,
    payload: String,
    configParams: StepConfigParamsInput[]
  ): void {
    configParams = this.sanitizeStepConfigParams(configParams);

    this.testedFlowStep$.next('loading');
    this.api.testFlowStep(stepId, payload, configParams).subscribe(
      test => {
        this.testedFlowStep$.next(test);
      },
      error => this.testedFlowStep$.next(error)
    );
  }

  /**
   * Helpers
   */

  sanitizeStepConfigParams(configParams): StepConfigParamsInput[] | null {
    // Remove the __typename property before making the API request
    return (
      (configParams &&
        configParams.map(
          param => lodash.omit(param, ['__typename']) as StepConfigParamsInput
        )) ||
      null
    );
  }
}
