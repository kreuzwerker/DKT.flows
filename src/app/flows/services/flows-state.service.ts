import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from './../../reducers';
import * as state from './../reducers';
import { Flow, FlowData, Step, StepData, Provider, Service } from './../models';
import { FlowActions, StepActions, ProvidersActions } from './../actions';

@Injectable()
export class FlowsStateService {
  // Current loaded flow
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
      private flowActions: FlowActions,
      private stepActions: StepActions,
      private providersActions: ProvidersActions,
      private store$: Store<AppState>
    ) {
    this.flow$               = store$.let(state.getCurrentFlow());
    this.isLoadingFlow$      = store$.let(state.isLoadingFlow());
    this.step$               = store$.let(state.getCurrentStep());
    this.providers$          = store$.let(state.getProviders());
    this.isLoadingProviders$ = store$.let(state.isLoadingProviders());
    this.provider$           = store$.let(state.getCurrentProvider());
  }

  loadFlow(id: string): void {
    this.store$.dispatch(
      this.flowActions.loadFlow(id)
    );
  }

  saveFlow(id: string, flow: FlowData): void {
    this.store$.dispatch(
      this.flowActions.saveFlow(id, flow)
    );
  }

  saveFlowStep(flowId: string, stepId: string, step: StepData): void {
    this.store$.dispatch(
      this.stepActions.saveStep(flowId, stepId, step)
    );
  }

  loadProviders(): void {
    this.store$.dispatch(
      this.providersActions.loadProviders()
    );
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
