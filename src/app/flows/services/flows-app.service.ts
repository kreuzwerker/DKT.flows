import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

import { Flow, Step } from './../models'
import { FlowsStateService } from './';

@Injectable()
export class FlowsAppService {
  flow: Flow = null;
  steps: Step[] = [];
  requestedStepId: string = null;

  // NB it's required to declare FlowsApp as provider when used with a component
  // @see http://stackoverflow.com/questions/39977962/angular-2-0-2-activatedroute-is-empty-in-a-service
  constructor(public route: ActivatedRoute, public state: FlowsStateService) {
    this.onFlowRouteChange()
    this.onStepRouteChange()

    this.state.flow$.subscribe((flow) => {
      this.flow = flow
      this.steps = flow.steps
      this.selectRequestedStep()
    });
  }

  // Load flow
  onFlowRouteChange() {
    this.route.params
      .map(params => params['flowId'])
      .subscribe((flowId) => {
        this.state.loadFlow(flowId);
      });
  }

  // Updated requested step ID and select the step if flow steps are loaded
  onStepRouteChange() {
    this.route.params
      .map(params => params['stepId'])
      .subscribe((stepId) => {
        this.requestedStepId = stepId;
        this.selectRequestedStep();
      });
  }

  selectRequestedStep() {
    if (!this.steps.length) {
      return;
    }

    if (this.requestedStepId !== null) {
      // Find requested step
      var requestedStep = this.steps.find(step => step.id === this.requestedStepId);
    } else {
      // Fall back to first step by default
      var requestedStep = this.flow.steps[0];
    }

    this.state.selectStep(requestedStep);
  }
}
