import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, Step } from './../../models';

@Component({
  templateUrl: 'flows-app.component.html',
  styleUrls: ['flows-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsAppComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowSub$: Subscription;

  requestedStepId: string = null;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: FlowsStateService,
  ) { }

  ngOnInit() {
    this.route.params.takeUntil(this.ngOnDestroy$).map(params => params['flowId'])
    .subscribe(
      this.onFlowRouteChange.bind(this),
      (err) => console.log('error', err)
    );

    this.router.events.takeUntil(this.ngOnDestroy$).filter(event => event instanceof NavigationEnd)
    .subscribe(
      this.onStepRouteChange.bind(this),
      (err) => console.log('error', err)
    );

    // Current selected flow
    this.flowSub$ = this.state.flow$.subscribe(
      this.onSelectFlow.bind(this),
      (err) => console.log('error', err)
    );

    // Current selected step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectStep.bind(this),
      (err) => console.log('error', err)
    );
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.flowSub$.unsubscribe();
  }

  onSelectFlow(flow: Flow) {
    this.flowsApp.flow = flow;
    this.selectRequestedStep();
    this.cd.markForCheck();
  }

  onSelectStep(step: Step) {
    this.flowsApp.setStep(step);
    this.cd.markForCheck();
  }

  /*
    Routing: load the requested flow and select the request step on route changes
  */

  onFlowRouteChange(flowId: string) {
    this.state.selectFlow(flowId);
    this.cd.markForCheck();
  }

  // Updated requested step ID and select the step if flow steps are loaded
  onStepRouteChange() {
    // Check if there's a /steps child route
    if (this.route.children) {
      this.route.children[0].params.forEach((params: Params) => {
        if (params['stepId'] && params['stepId'] !== this.requestedStepId) {
          this.requestedStepId = params['stepId'];
          this.selectRequestedStep();
          this.cd.markForCheck();
        }
      });
    }
  }

  selectRequestedStep() {
    if (!this.flowsApp.flow || !this.flowsApp.flow.steps.length) {
      return false;
    }

    let requestedStep;
    if (this.requestedStepId !== null) {
      // Find requested step
      requestedStep = this.flowsApp.flow.steps.find(step => step.id === this.requestedStepId);
    }

    if (requestedStep) {
      this.state.dispatch(this.state.actions.selectStep(requestedStep));
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

  isSelectedStep(step: Step): boolean {
    return step.id && this.flowsApp.step && step.id === this.flowsApp.step.id;
  }
}
