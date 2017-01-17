import 'rxjs/add/operator/let';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { ApolloQueryResult } from 'apollo-client';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import gql from 'graphql-tag';

import { AppState } from './../../reducers';
import * as state from './../reducers';
import { Flow, FlowData, Step, StepData, Provider, Service } from './../models';
import { FlowActions, StepActions, ProvidersActions } from './../actions';

import { getFlows, FlowsListData, getFlow, updateStep } from './flow.gql';
import { getProviders } from './provider.gql';

@Injectable()
export class FlowsStateService {
  // Flows list
  flows$: Observable<FlowsListData[]>;
  // Current loaded flow
  flowId$: Subject<string> = new Subject<string>();
  flow$: Observable<Flow>;
  isLoadingFlow$: Observable<Boolean>;
  // Current editing step
  step$: Observable<Step>;
  // Available providers
  providers$: Observable<Provider[]>;
  isLoadingProviders$: Observable<Boolean>;
  // Current provider
  provider$: Observable<Provider>;

  constructor(
      private apollo: Angular2Apollo,
      private flowActions: FlowActions,
      private stepActions: StepActions,
      private providersActions: ProvidersActions,
      private store$: Store<AppState>
    ) {

    // Fetches list of flows
    this.flows$ = this.apollo.watchQuery<any>({
      query: getFlows
    }).map(({data}) => data.allFlows);

    // Fetches flow data reactively when flowId$ changes
    this.flow$ = this.apollo.watchQuery<any>({
      query: getFlow,
      variables: {
        id: this.flowId$
      }
    }).map(({data}) => data.Flow);
    this.flow$.subscribe((flow) => {
      this.store$.dispatch(
        this.flowActions.fetchFlowFulfilled(flow)
      );
    });

    this.isLoadingFlow$      = store$.let(state.isLoadingFlow());
    this.step$               = store$.let(state.getCurrentStep());

    this.isLoadingProviders$ = store$.let(state.isLoadingProviders());
    this.provider$           = store$.let(state.getCurrentProvider());
  }

  loadFlow(id: string): void {
    this.store$.dispatch(
      this.flowActions.loadFlow(id)
    );

    // NB setTimeout required for initial call to loadFlow
    setTimeout(() => {
      this.flowId$.next(id);
    }, 1);
  }

  saveFlow(id: string, flow: FlowData): void {
    // this.store$.dispatch(
    //   this.flowActions.saveFlow(id, flow)
    // );
  }

  saveFlowStep(flowId: string, stepId: string, step: StepData): void {
    this.store$.dispatch(
      this.stepActions.saveStep(flowId, stepId, step)
    );

    this.apollo.mutate<any>({
      mutation: updateStep,
      variables: {
        id: stepId,
        position: step.position,
        serviceId: step.service.id
      }
    }).subscribe((data) => {
      this.store$.dispatch(
        this.stepActions.updateStepFulfilled()
      );
    });
  }

  loadProviders(): void {

    // TODO if apollo was using the same store as ngrx, this could be implemented
    // via Effects: dispatch "loadProviders" -> Effect: this.apollow.watchQuery -> 
    // subscribe dispatch "fetchProvidersFulfilled"
    // 
    // With MobX:
    // Store.setProvidersLoading(true)
    // this.apollow.watchQuery -> subscribe: Store.setProvidersLoading(false)

    this.store$.dispatch(
      this.providersActions.loadProviders()
    );

    this.providers$ = this.apollo.watchQuery<any>({
      query: getProviders
    }).map(({data}) => data.allProviders);

    this.providers$.subscribe((providers) => {
      this.store$.dispatch(
        this.providersActions.fetchProvidersFulfilled(providers)
      );
    });
  }

  selectStep(step: Step): void {
    this.store$.dispatch(
      this.stepActions.selectStep(step)
    );
  }

  setStepService(provider: Provider, service: Service): void {
    this.store$.dispatch(
      this.stepActions.setStepService(provider, service)
    );
  }

  selectProvider(provider: Provider): void {
    this.store$.dispatch(
      this.providersActions.selectProvider(provider)
    );
  }
}
