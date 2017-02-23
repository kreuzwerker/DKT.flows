import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

import { NgRedux, select } from 'ng2-redux';
import { AppState, Action } from './../../reducers';
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
      private store: NgRedux<AppState>,
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


    // TODO THIS IS WRONG: creates another watched query. 
    // -> right way is to use middleware/thunks/effects:
    // When a mutation API call is made -> set flag; when API call returns -> unset flag.
    this.flow$.subscribe((flow) => this.dispatch(this.actions.setLoadingFlow(false)) );
    // /TODO

    // Providers list
    // --------------

    this.providers$ = this.api.getProviders({
      // NB fake var to hold back the query until we trigger it via this observable
      id: this.loadProviders$
    }).map(({data}) => data.allProviders);
    // Unset loading providers flag
    this.providers$.subscribe((providers) => this.dispatch(
      this.actions.setLoadingProviders(false)
    ) );
  }

  // 
  // UI State
  // 

  // Get a UI state property observable
  select(key: string) {
    return this.store.select('flowsApp')
      .map(state => state[key])
      .distinctUntilChanged();
  }

  // Get a current UI state property value
  get(key: string) {
    // @see http://stackoverflow.com/questions/35633684/how-to-get-current-value-of-state-object-with-ngrx-store
    let value;
    this.store.select('flowsApp')
      .map(state => state[key])
      .take(1)
      .subscribe(s => value = s);

    return value;
  }

  // 
  // API
  // 

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  selectFlow(id: String): void {
    if (id === this.get('flowId')) {
      // Requested flow is already selected
      return;
    }

    this.dispatch(this.actions.setLoadingFlow(true));
    this.dispatch(this.actions.selectFlow(id));
  }

  saveFlow(id: String, flow: FlowData): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
  }

  saveFlowStep(flowId: String, stepId: string, step: StepData): void {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.updateStep({
      id: stepId,
      position: step.position,
      serviceId: step.service.id
    }).subscribe((_step) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
    });
  }

  addFlowStep(flowId: String, step: Step): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.addFlowStep(flowId, step).subscribe((_step) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
      obs$.next(_step);
    });

    return obs$;
  }

  removeFlowStep(flowId: String, step: Step) {
    this.dispatch(this.actions.setSavingFlow(true, false));
    this.api.removeFlowStep(flowId, step).subscribe((data) => {
      this.dispatch(this.actions.setSavingFlow(false, true));
    });
  }

  loadProviders(): void {
    this.dispatch(this.actions.setLoadingProviders(true));
    // Trigger loading the providers
    this.loadProviders$.next(1);
  }
}
