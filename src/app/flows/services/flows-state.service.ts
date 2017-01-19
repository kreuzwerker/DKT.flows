import 'rxjs/add/operator/filter'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import gql from 'graphql-tag';

import { AppState } from './../../reducers';
import { Flow, FlowData, Step, StepData, Provider, Service } from './../models';
import { FlowsAppActions } from './../states';

import { getFlows, FlowsListData, getFlow, updateStep } from './flow.gql';
import { getProviders } from './provider.gql';

@Injectable()
export class FlowsStateService {

  // 
  // App data state
  // 

  // All flows list
  flows$: Observable<FlowsListData[]>;
  // Current loaded flow
  flow$: Observable<Flow>;
  // Available providers
  providers$: Observable<Provider[]>;

  // 
  // Internal state
  // 

  // Flag to initiate loading providers
  private loadProviders$: Subject<any> = new Subject<any>();

  constructor(
      private apollo: Angular2Apollo,
      private store$: Store<AppState>,
      private actions: FlowsAppActions
    ) {

    // 
    // App data queries
    // 

    // Flows list
    // ----------

    // Fetches list of flows
    this.flows$ = this.apollo.watchQuery<any>({
      query: getFlows
    }).map(({data}) => data.allFlows);


    // Current selected flow
    // ---------------------

    // Fetches flow data reactively as soon as flowId gets set or changes, i.e.
    // DOES NOT fetch flow data when flowId is null or unchanged.
    this.flow$ = this.apollo.watchQuery<any>({
      query: getFlow,
      variables: {
        id: this.select('flowId').filter((flowId) => flowId !== null)
      }
    }).map(({data}) => data.Flow);
    // Unset loading flows flag
    this.flow$.subscribe((flow) => this.dispatch(this.actions.setLoadingFlow(false)) );


    // Providers list
    // --------------

    this.providers$ = this.apollo.watchQuery<any>({
      query: getProviders,
      variables: {
        id: this.loadProviders$
      }
    }).map(({data}) => data.allProviders);
    // Unset loading providers flag
    this.providers$.subscribe((providers) => this.dispatch(this.actions.setLoadingProviders(false)) );
  }

  // 
  // UI State
  // 

  // Get a UI state property observable
  select(key: string) {
    return this.store$
      .select('flowsApp')
      .map(state => state[key])
      .distinctUntilChanged();
  }

  // Get a current UI state property value
  get(key: string) {
    // @see http://stackoverflow.com/questions/35633684/how-to-get-current-value-of-state-object-with-ngrx-store
    let value;
    this.store$
      .select('flowsApp')
      .map(state => state[key])
      .take(1)
      .subscribe(s => value = s);

    return value;
  }

  // 
  // API
  // 

  selectFlow(id: string): void {
    if(id === this.get('flowId')) {
      // Requested flow is already selected
      return;
    }

    this.dispatch(this.actions.setLoadingFlow(true));
    this.dispatch(this.actions.selectFlow(id));
  }

  saveFlow(id: string, flow: FlowData): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
  }

  saveFlowStep(flowId: string, stepId: string, step: StepData): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.apollo.mutate<any>({
      mutation: updateStep,
      variables: {
        id: stepId,
        position: step.position,
        serviceId: step.service.id
      }
    }).subscribe((data) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
    });
  }

  loadProviders(): void {
    this.dispatch(this.actions.setLoadingProviders(true));
    // Trigger loading the providers
    this.loadProviders$.next(1);
  }

  selectStep(step: Step): void {
    this.dispatch(this.actions.selectStep(step));
  }

  setStepService(provider: Provider, service: Service): void {
    this.dispatch(this.actions.setStepService(provider, service));
  }

  selectProvider(provider: Provider): void {
    this.dispatch(this.actions.selectProvider(provider));
  }

  // 
  // Internal methods
  // 

  private dispatch(action) {
    this.store$.dispatch(action);
  }
}
