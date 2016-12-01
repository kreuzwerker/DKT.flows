import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Step } from './../../models';

@Component({
	templateUrl: 'flows-app.component.html',
	styleUrls: ['flows-app.component.css']
})
export class FlowsAppComponent {
  requestedStepId: string = null;

  constructor(
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: FlowsStateService
  ) {
    console.log('CONSTRUC FLOWS APP')
    this.onFlowRouteChange()
    this.onStepRouteChange()

    // Current selected flow
    this.state.flow$.subscribe((flow) => {
      this.flowsApp.flow = flow
      this.flowsApp.steps = flow.steps
      this.selectRequestedStep()
    });

    // Current selected step
    this.state.step$.subscribe((step) => {
      this.flowsApp.step = step;
    });
  }

  /*
    Routes
  */

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
    this.router.events.subscribe((e) => {
      // Check if there's a /steps child route
      if (this.route.children) {
        this.route.children[0].params.forEach((params: Params) => {
          if (params['stepId']) {
            this.requestedStepId = params['stepId'];
            this.selectRequestedStep();
          }
        });
      }
    });
  }

  selectRequestedStep() {
    if (!this.flowsApp.steps.length) {
      return;
    }

    if (this.requestedStepId !== null) {
      // Find requested step
      var requestedStep = this.flowsApp.steps.find(step => step.id === this.requestedStepId);
    } else {
      // Fall back to first step by default
      var requestedStep = this.flowsApp.flow.steps[0];
    }

    if (requestedStep) {
      this.state.selectStep(requestedStep);
    }
  }

  /*
    Flows steps
  */

  getCurrentActiveStepOption (step: Step): string {
    return (step && this.flowsApp.step && step.id === this.flowsApp.step.id) ? this.flowsApp.stepStage : '';
  }
}
