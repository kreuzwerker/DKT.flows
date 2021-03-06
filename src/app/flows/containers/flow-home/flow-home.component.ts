/* tslint:disable: ter-max-len */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, FlowState } from './../../models';
import * as helpers from './../../utils/flow.helpers';

@Component({
  selector: 'flow-home',
  templateUrl: 'flow-home.component.html',
  styleUrls: ['flow-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowHomeComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowSub$: Subscription;

  infoBoxIcon: String = null;
  infoBoxMessage: String = null;
  infoBoxAction: Function = null;
  infoBoxActionIcon: String = null;
  infoBoxActionLabel: String = null;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
  ) { }

  ngOnInit() {
    // Explicitely unselect the current step to clean up any previous state
    this.state.selectStep(null);

    // Register current step preparation stage
    this.flowsApp.setStepStage(null);

    // Current selected flow
    this.flowSub$ = this.state.flow$.subscribe(
      this.onSelectFlow.bind(this),
      (err) => console.log('error', err)
    );

    // Started new flow run
    this.state.createdFlowRun$.takeUntil(this.ngOnDestroy$).subscribe(
      this.onStartedFlowRun.bind(this),
      (err) => console.log('error', err)
    );
  }

  onSelectFlow(flow: Flow) {
    // Set info box contents for current flow state
    this.setInfoBoxContents(helpers.getFlowState(flow), flow);
    this.cd.markForCheck();
  }

  onStartedFlowRun(flowRun: any) {
    if (flowRun.status === 'running') {
      this.setInfoBoxContents(FlowState.TRIGGERED, this.flowsApp.flow);
      this.cd.markForCheck();
    }
  }

  setInfoBoxContents(state, flow: Flow) {
    switch (state) {
      case FlowState.MISSING_TRIGGER:
        this.infoBoxIcon = 'flow';
        this.infoBoxMessage = 'Please add a trigger.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Add Trigger';
        this.infoBoxAction = () => this.flowsApp.addFlowStep();
        break;

      case FlowState.UNFINISHED_TRIGGER:
        this.infoBoxIcon = 'flow';
        this.infoBoxMessage = 'Please finish configuring the Trigger.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Configure Trigger';

        const triggerStep = helpers.getFlowTriggerStep(flow);
        this.infoBoxAction = () => this.flowsApp.configureStep(flow.id, triggerStep.id);
        break;

      case FlowState.MISSING_ACTION:
        this.infoBoxIcon = 'flow';
        this.infoBoxMessage = 'This Flow requires at least one more action to be successfully configured.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Add Action';
        this.infoBoxAction = () => this.flowsApp.addFlowStep();
        break;

      case FlowState.UNFINISHED_ACTION:
        this.infoBoxIcon = 'flow';
        this.infoBoxMessage = 'Please finish configuring an action.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Configure Action';

        const actionStep = helpers.getFlowActionStep(flow);
        this.infoBoxAction = () => this.flowsApp.selectStep(flow.id, actionStep.id);
        break;

      case FlowState.NOT_DEPLOYED:
        this.infoBoxIcon = 'publish';
        this.infoBoxMessage = 'This flow has undeployed changes.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Deploy Flow';
        this.infoBoxAction = () => this.flowsApp.createFlowRun();
        break;

      case FlowState.NOT_ACTIVATED:
        this.infoBoxIcon = 'done_all';
        this.infoBoxMessage = 'This flow has been successfully configured and tested.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Activate Flow';
        this.infoBoxAction = () => this.state.activateFlow(flow);
        break;

      case FlowState.NOT_TRIGGERED:
        this.infoBoxIcon = 'done_all';
        this.infoBoxMessage = 'This flow has been successfully activated and is ready to be triggered.';
        this.infoBoxActionIcon = null;
        this.infoBoxActionLabel = 'Trigger manually';
        this.infoBoxAction = () => this.flowsApp.openTriggerFlowRunDialog$.next(true);
        break;

      case FlowState.TRIGGERED:
        this.infoBoxIcon = 'done_all';
        this.infoBoxMessage = 'This flow has been successfully triggered and is now running.';
        this.infoBoxActionIcon = 'flow';
        this.infoBoxActionLabel = 'Flows Overview';
        this.infoBoxAction = () => this.flowsApp.showAllFlows();
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.flowSub$.unsubscribe();
  }
}
