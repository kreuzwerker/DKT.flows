/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { AppState } from './../../reducers';

import { Step, StepData, Provider, Service } from '../models';

@Injectable()
export class FlowsAppActions {

  constructor(
      private store$: Store<AppState>,
    ) {}

  private dispatch(action: Action) {
    this.store$.dispatch(action);
  }

  static SELECT_FLOW = 'SELECT_FLOW';
  selectFlow(flowId: String) {
    this.dispatch({
      type: FlowsAppActions.SELECT_FLOW,
      payload: flowId
    });
  }

  static SELECT_STEP = 'SELECT_STEP';
  selectStep(step: Step) {
    this.dispatch({
      type: FlowsAppActions.SELECT_STEP,
      payload: step
    });
  }

  static SET_STEP_SERVICE_STEP = 'SET_STEP_SERVICE_STEP';
  setStepService(provider: Provider, service: Service) {
    this.dispatch({
      type: FlowsAppActions.SET_STEP_SERVICE_STEP,
      payload: {
        provider: provider,
        service: service,
      }
    });
  }

  static SELECT_PROVIDER = 'SELECT_PROVIDER';
  selectProvider(provider: Provider) {
    this.dispatch({
      type: FlowsAppActions.SELECT_PROVIDER,
      payload: provider
    });
  }

  /**
   * Flags
   */

  static SET_LOADING_FLOW = 'SET_LOADING_FLOW';
  setLoadingFlow(loading: boolean) {
    this.dispatch({
      type: FlowsAppActions.SET_LOADING_FLOW,
      payload: loading
    });
  }

  static SET_LOADING_FLOWS = 'SET_LOADING_FLOWS';
  setLoadingFlows(loading: boolean) {
    this.dispatch({
      type: FlowsAppActions.SET_LOADING_FLOWS,
      payload: loading
    });
  }

  static SET_LOADING_PROVIDERS = 'SET_LOADING_PROVIDERS';
  setLoadingProviders(loading: boolean) {
    this.dispatch({
      type: FlowsAppActions.SET_LOADING_PROVIDERS,
      payload: loading
    });
  }

  static SET_SAVING_FLOW = 'SET_SAVING_FLOW';
  setSavingFlow(saving: boolean, saved: boolean) {
    this.dispatch({
      type: FlowsAppActions.SET_SAVING_FLOW,
      payload: {
        saving: saving,
        saved: saved
      }
    });
  }
}
