import { Subject } from 'rxjs/Subject';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Step } from './../../models';

@Component({
  templateUrl: 'flows-app.component.html',
  styleUrls: ['flows-app.component.css']
})
export class FlowsAppComponent implements OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  requestedStepId: string = null;

  constructor(
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: FlowsStateService
  ) {
    this.onFlowRouteChange();
    this.onStepRouteChange();

    // Current selected flow

    // TODO make it work with takeUntil: transform flow object into data.flow.Flow..
    //  ..no idea why
    // this.state.flow$.takeUntil(this.ngOnDestroy$).subscribe((flow) => {
    this.state.flow$.subscribe((flow) => {
      this.flowsApp.flow = flow;
      this.selectRequestedStep();
    });

    // Current selected step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe((step) => {
      this.flowsApp.setStep(step);
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  /*
    Routing: load the requested flow and select the request step on route changes
  */

  // Load flow
  onFlowRouteChange() {
    this.route.params.takeUntil(this.ngOnDestroy$)
      .map(params => params['flowId'])
      .subscribe((flowId) => {
        this.state.selectFlow(flowId);
      });
  }

  // Updated requested step ID and select the step if flow steps are loaded
  onStepRouteChange() {
    this.router.events.takeUntil(this.ngOnDestroy$)
      .filter(event => event instanceof NavigationEnd)
      .subscribe((e) => {
        // Check if there's a /steps child route
        if (this.route.children) {
          this.route.children[0].params.forEach((params: Params) => {
            if (params['stepId'] && params['stepId'] !== this.requestedStepId) {
              this.requestedStepId = params['stepId'];
              this.selectRequestedStep();
            }
          });
        }
      });
  }

  selectRequestedStep() {
    if (!this.flowsApp.flow || !this.flowsApp.flow.steps.length) {
      return;
    }

    let requestedStep;
    if (this.requestedStepId !== null) {
      // Find requested step
      requestedStep = this.flowsApp.flow.steps.find(step => step.id === this.requestedStepId);
    } else {
      // Fall back to first step by default
      requestedStep = this.flowsApp.flow.steps[0];
    }

    if (requestedStep) {
      this.state.selectStep(requestedStep);
    }
  }

  /*
    Flows steps
  */

  getCurrentActiveStepOption (step: Step): string {
    return (step && this.flowsApp.step && step.id === this.flowsApp.step.id) ?
      this.flowsApp.stepStage :
      '';
  }
}
