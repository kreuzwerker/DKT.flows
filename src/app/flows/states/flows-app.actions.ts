/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { Step, StepData, StepConfigParamsInput, Provider, Service } from '../models';

@Injectable()
export class FlowsAppActions {

  static SELECT_FLOW = 'SELECT_FLOW';
  selectFlow(flowId: string) {
    return {
      type: FlowsAppActions.SELECT_FLOW,
      payload: flowId
    };
  }

  static SELECT_STEP = 'SELECT_STEP';
  selectStep(step: Step) {
    return {
      type: FlowsAppActions.SELECT_STEP,
      payload: step
    };
  }

  static SET_STEP_SERVICE_STEP = 'SET_STEP_SERVICE_STEP';
  setStepService(provider: Provider, service: Service) {
    return {
      type: FlowsAppActions.SET_STEP_SERVICE_STEP,
      payload: {
        provider: provider,
        service: service,
      }
    };
  }

  static SELECT_PROVIDER = 'SELECT_PROVIDER';
  selectProvider(provider: Provider) {
    return {
      type: FlowsAppActions.SELECT_PROVIDER,
      payload: provider
    };
  }

  static SET_STEP_CONFIG = 'SET_STEP_CONFIG';
  setStepConfig(configParams: StepConfigParamsInput[]) {
    return {
      type: FlowsAppActions.SET_STEP_CONFIG,
      payload: {
        configParams: configParams,
      }
    };
  }

  /**
   * Flags
   */

  static SET_LOADING_FLOW = 'SET_LOADING_FLOW';
  setLoadingFlow(loading: boolean) {
    return {
      type: FlowsAppActions.SET_LOADING_FLOW,
      payload: loading
    };
  }

  static SET_LOADING_FLOWS = 'SET_LOADING_FLOWS';
  setLoadingFlows(loading: boolean) {
    return {
      type: FlowsAppActions.SET_LOADING_FLOWS,
      payload: loading
    };
  }

  static SET_LOADING_FLOW_LOGS = 'SET_LOADING_FLOW_LOGS';
  setLoadingFlowLogs(loading: boolean) {
    return {
      type: FlowsAppActions.SET_LOADING_FLOW_LOGS,
      payload: loading
    };
  }

  static SET_LOADING_PROVIDERS = 'SET_LOADING_PROVIDERS';
  setLoadingProviders(loading: boolean) {
    return {
      type: FlowsAppActions.SET_LOADING_PROVIDERS,
      payload: loading
    };
  }

  static SET_SAVING_FLOW = 'SET_SAVING_FLOW';
  setSavingFlow(saving: boolean, saved: boolean) {
    return {
      type: FlowsAppActions.SET_SAVING_FLOW,
      payload: {
        saving: saving,
        saved: saved
      }
    };
  }
}
