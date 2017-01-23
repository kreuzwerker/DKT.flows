import 'rxjs/add/operator/filter'
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { AppState } from './../../reducers';
import { FlowsApiService } from './../services';
import { Flow, FlowData, Step, StepData, Provider, Service } from './../models';
import { FlowsAppActions } from './../states';

import { FlowsListData } from './flow.gql';

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
      private api: FlowsApiService,
      private store$: Store<AppState>,
      public actions: FlowsAppActions,
    ) {

    // 
    // App data queries
    // 

    // Flows list
    // ----------

    // Fetches list of flows
    this.flows$ = this.api.getFlows().map(({data}) => data.allFlows);


    // Current selected flow
    // ---------------------

    // Fetches flow data reactively as soon as flowId gets set or changes, i.e.
    // DOES NOT fetch flow data when flowId is null or unchanged.

    this.flow$ = this.api.getFlow({
      id: this.select('flowId').filter((flowId) => flowId !== null)
    }).map(({data}) => data.Flow);
    // Unset loading flows flag
    this.flow$.subscribe((flow) => this.actions.setLoadingFlow(false) );


    // Providers list
    // --------------

    this.providers$ = this.api.getProviders({
      // NB fake var to hold back the query until we trigger it via this observable
      id: this.loadProviders$
    }).map(({data}) => data.allProviders);
    // Unset loading providers flag
    this.providers$.subscribe((providers) => this.actions.setLoadingProviders(false) );
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

  selectFlow(id: String): void {
    if(id === this.get('flowId')) {
      // Requested flow is already selected
      return;
    }

    this.actions.setLoadingFlow(true);
    this.actions.selectFlow(id);
  }

  saveFlow(id: String, flow: FlowData): void {
    this.actions.setSavingFlow(true, false);
  }

  saveFlowStep(flowId: String, stepId: string, step: StepData): void {
    this.actions.setSavingFlow(true, false);
    this.api.updateStep({
      id: stepId,
      position: step.position,
      serviceId: step.service.id
    }).subscribe((data) => {
      this.actions.setSavingFlow(false, true);
    });
  }

  loadProviders(): void {
    this.actions.setLoadingProviders(true);
    // Trigger loading the providers
    this.loadProviders$.next(1);
  }
}
