import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { ApolloError } from 'apollo-client';
import { TriggerFlowRunDialogComponent } from './../../components/trigger-flow-run-dialog/trigger-flow-run-dialog.component';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, Step, StepTest, FlowRun } from './../../models';

@Component({
  templateUrl: 'flows-app.component.html',
  styleUrls: ['flows-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FlowsAppComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  dialogConfig: MdDialogConfig;
  flowSub$: Subscription;

  requestedStepId: string = null;
  isSavingFlowDraft: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: FlowsStateService,
    public dialog: MdDialog,
  ) {
    this.dialogConfig = new MdDialogConfig();
    this.dialogConfig.width = '450px';
  }

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

    // Created new flow run
    this.state.createdFlowRun$.takeUntil(this.ngOnDestroy$).subscribe(
      this.onStartedFlowRun.bind(this),
      (err) => console.log('error', err)
    );

    // Tested flow step
    this.state.testedFlowStep$.takeUntil(this.ngOnDestroy$).subscribe(
      this.onTestedFlowStep.bind(this),
      (err) => console.log('error', err)
    );

    // An external component opens the "trigger flow run" dialog
    this.flowsApp.openTriggerFlowRunDialog$.takeUntil(this.ngOnDestroy$).subscribe(
      this.openTriggerFlowRunDialog.bind(this),
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
    Flow runs
  */

  openTriggerFlowRunDialog() {
    let dialogRef = this.dialog.open(TriggerFlowRunDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.flowsApp.startFlowRun(data.payload);
      }
    });
  }

  onStartedFlowRun(flowRun: any) {
    this.isSavingFlowDraft = false;
    if (flowRun === 'saving') {
      this.isSavingFlowDraft = true;
      this.flowsApp.showStatusMessage('Saving flow', 'loading');
    } else if (flowRun === 'saved') {
      this.flowsApp.showStatusMessage('Saved flow', 'success');
    } else if (flowRun === 'loading') {
      this.flowsApp.showStatusMessage('Triggering flow', 'loading');
    } else if (flowRun instanceof ApolloError) {
      this.flowsApp.showStatusMessage('An internal error occured. Flow could not be triggered', 'error');
    } else if (flowRun.status === 'running') {
      this.flowsApp.showStatusMessage('Flow successfully triggered');
    } else if (flowRun.status === 'success') {
      this.flowsApp.showStatusMessage('Flow successfully run.');
    } else {
      this.flowsApp.showStatusMessage(`An error occured. Flow could not be triggered. (status: '${flowRun.status}', message: '${flowRun.message}')`, 'error');
    }
    this.cd.markForCheck();
  }

  /**
   * Flow draft
   */

   saveFlowDraft() {
    this.flowsApp.createFlowRun();
  }

   discardFlowDraft() {
     console.log('discard');
   }

  /**
   * Step tests
   */

  onTestedFlowStep(stepTest: any) {
    if (stepTest === 'loading') {
      this.flowsApp.showStatusMessage('Testing step', 'loading');
    } else if (stepTest instanceof ApolloError) {
      this.flowsApp.showStatusMessage('An error occured. Step could not be tested', 'error');
    } else if (stepTest.tested) {
      this.flowsApp.showStatusMessage('Step successfully tested');
    } else {
      this.flowsApp.showStatusMessage('Step test was not successful.', 'error');
    }
    this.cd.markForCheck();
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
