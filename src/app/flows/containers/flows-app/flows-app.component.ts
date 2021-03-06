import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ApolloError } from 'apollo-client';
import { TriggerFlowRunDialogComponent } from './../../components/trigger-flow-run-dialog/trigger-flow-run-dialog.component';
import * as flowHelpers from '../../utils/flow.helpers';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, Step, StepTest, FlowRun } from './../../models';

@Component({
  templateUrl: 'flows-app.component.html',
  styleUrls: ['flows-app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FlowsAppComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  dialogConfig: MatDialogConfig;
  flowSub$: Subscription;

  requestedStepId: string = null;
  disableDraftControls: boolean = false;
  showSidebar: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public router: Router,
    public state: FlowsStateService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.width = '450px';

    // NB Since Angular v4.3 this.router.events fire already in constructor
    this.router.events
      .takeUntil(this.ngOnDestroy$)
      .filter(event => event instanceof NavigationEnd)
      .subscribe(this.onStepRouteChange.bind(this), err =>
        console.log('error', err)
      );
  }

  ngOnInit() {
    this.route.params
      .takeUntil(this.ngOnDestroy$)
      .map(params => params['flowId'])
      .subscribe(this.onFlowRouteChange.bind(this), err =>
        console.log('error', err)
      );

    // Current selected flow
    this.flowSub$ = this.state.flow$.subscribe(
      this.onSelectFlow.bind(this),
      err => console.log('error', err)
    );

    // Current selected step
    this.state
      .select('step')
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onSelectStep.bind(this), err =>
        console.log('error', err)
      );

    // Created new flow run
    this.state.createdFlowRun$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onStartedFlowRun.bind(this), err =>
        console.log('error', err)
      );

    // Tested flow step
    this.state.testedFlowStep$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onTestedFlowStep.bind(this), err =>
        console.log('error', err)
      );

    // An external component opens the "trigger flow run" dialog
    this.flowsApp.openTriggerFlowRunDialog$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.openTriggerFlowRunDialog.bind(this), err =>
        console.log('error', err)
      );
  }

  ngOnDestroy(): void {
    // Clean up state
    this.flowsApp.setFlow(null);
    this.state.dispatch(this.state.actions.selectFlow(null));
    this.flowsApp.setStep(null);
    this.state.dispatch(this.state.actions.selectStep(null));
    this.flowsApp.hideStatusMessage();

    this.ngOnDestroy$.next(true);
    this.flowSub$.unsubscribe();
  }

  onSelectFlow(flow: Flow) {
    this.flowsApp.setFlow(flow);
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
    if (
      typeof this.requestedStepId === 'undefined' ||
      !this.requestedStepId ||
      !this.flowsApp.flow ||
      !this.flowsApp.flow.steps.length
    ) {
      return false;
    }

    // Find requested step
    let requestedStep;
    requestedStep = this.flowsApp.flow.steps.find(
      step => step.id === this.requestedStepId
    );

    if (requestedStep) {
      this.state.selectStep(requestedStep);

      // Clean up state
      this.requestedStepId = null;
    }
  }

  /*
    Flow runs
  */

  openTriggerFlowRunDialog() {
    let dialogRef = this.dialog.open(
      TriggerFlowRunDialogComponent,
      this.dialogConfig
    );
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.flowsApp.startFlowRun(data.payload);
      }
    });
  }

  onStartedFlowRun(flowRun: any) {
    this.disableDraftControls = false;
    if (flowRun === 'saving') {
      this.disableDraftControls = true;
      this.flowsApp.showStatusMessage('Deploying changes', 'loading');
    } else if (flowRun === 'saved') {
      this.flowsApp.showStatusMessage('Deployed changes', 'success');
    } else if (flowRun === 'restoring') {
      this.disableDraftControls = true;
      this.flowsApp.showStatusMessage('Discarding changes', 'loading');
    } else if (flowRun === 'restored') {
      this.onDiscardFlowDraft();
      this.flowsApp.showStatusMessage('Restored previous version', 'success');
    } else if (flowRun === 'loading') {
      this.flowsApp.showStatusMessage('Triggering flow', 'loading');
    } else if (flowRun instanceof ApolloError) {
      this.flowsApp.showStatusMessage(
        'An internal error occured. Flow could not be triggered',
        'error'
      );
    } else if (flowRun.status === 'running') {
      this.flowsApp.showStatusMessage('Flow successfully triggered');
    } else if (flowRun.status === 'success') {
      this.flowsApp.showStatusMessage('Flow successfully run.');
    } else {
      this.flowsApp.showStatusMessage(
        `An error occured. Flow could not be triggered.
        (status: '${flowRun.status}', message: '${flowRun.message}')`,
        'error'
      );
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
    if (this.flowsApp.flow.lastFlowRun) {
      this.flowsApp.restoreFlow();
    } else {
      this.disableDraftControls = true;
      this.flowsApp.showStatusMessage('Deleting flow', 'loading');
      const name = this.flowsApp.flow.name;
      this.flowsApp.deleteFlow().subscribe(
        success => {
          // Upon successful flow deletion redirect user to flows overview
          this.disableDraftControls = false;
          this.flowsApp.hideStatusMessage();
          this.showInfoMessage(`Deleted flow "${name}".`);
          this.cd.markForCheck();
          this.router.navigate(['flows']);
        },
        err => {
          // Restore controls
          this.disableDraftControls = false;
          this.flowsApp.hideStatusMessage();
          this.cd.markForCheck();
        }
      );
    }
  }

  onDiscardFlowDraft() {
    // After discardig the current state, the current selected step might not
    // exist anymore. Redirect to flow home and by that unselect any step.
    this.router.navigate(['flows', this.flowsApp.flow.id]);
  }

  /**
   * Step tests
   */

  onTestedFlowStep(stepTest: any) {
    if (stepTest === 'loading') {
      this.flowsApp.showStatusMessage('Testing step', 'loading');
    } else if (stepTest instanceof ApolloError) {
      this.flowsApp.showStatusMessage(
        'An error occured. Step could not be tested',
        'error'
      );
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

  getCurrentActiveStepOption(step: Step): string {
    return step && this.flowsApp.step && step.id === this.flowsApp.step.id
      ? this.flowsApp.stepStage
      : '';
  }

  isSelectedStep(step: Step): boolean {
    return step.id && this.flowsApp.step && step.id === this.flowsApp.step.id;
  }

  /*
    Helper methods
   */

  disableDeployControl(): boolean {
    // Prevent deployment if the flow isn't executable
    return !flowHelpers.flowIsExecutable(this.flowsApp.flow);
  }

  showInfoMessage(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }
}
