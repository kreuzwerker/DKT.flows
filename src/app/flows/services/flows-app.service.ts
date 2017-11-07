/*
  Shared functionality in the Flows app
*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { UUID } from 'angular2-uuid';

import { Flow, Step, Service, ServiceType } from './../models';
import { FlowsListData } from './flow.gql';
import { FlowsStateService } from './';
import * as stepHelpers from './../utils/step.helpers';

@Injectable()
export class FlowsAppService {
  // Current selected flow / flow steps
  flow: Flow = null;
  // Current selected step
  step: Step = null;
  stepTypeName: string = null;
  // Current step preparation stage: select, configure, test
  // Gets set by child component, e.g. FlowHome, SelectService etc.
  stepStage = null;
  // Status message
  statusMessageText: string = '';
  statusMessageType: string = 'success';
  statusMessageShow: boolean = false;
  // Allow children components to control dialogs
  openTriggerFlowRunDialog$: Subject<any> = new Subject<any>();

  constructor(
    public state: FlowsStateService,
    private router: Router,
  ) {}

  setFlow(flow: Flow): void {
    this.flow = flow;
  }

  setStep(step: Step): void {
    this.step = step;
    this.stepTypeName = step
      ? stepHelpers.getStepServiceTypeName(step)
      : null;
  }

  /*
    Step preparation stage
  */

  setStepStage(stage: string): void {
    this.stepStage = stage;
  }

  /*
    CRUD
  */

  saveFlow(): void {
    this.state.saveFlow(this.flow.id, this.flow);
  }

  deleteFlow(): Observable<any> {
    return this.state.deleteFlow(this.flow.id);
  }

  saveFlowStep(): Observable<any> {
    return this.state.saveFlowStep(this.flow.id, this.step.id, this.step);
  }

  addFlowStep(position: number | null = null): void {
    if (position === null) {
      // Append new step at the end
      const lastStep = _.last(this.flow.steps);
      position = lastStep ? lastStep.position + 1 : 0;
    }

    let newStep = this.createStepObject({
      position: position
    });
    this.state.addFlowStep(this.flow, newStep).subscribe((newStep) => {
      // Select new step as soon as its available in flow.steps
      // NB no optimistic response possible here
      this.selectStep(this.flow.id, newStep.id);
    });
  }

  removeFlowStep(step: Step): void {
    // Don't allow trigger step to be removed
    if (stepHelpers.getStepServiceType(step) === ServiceType.TRIGGER) {
      return;
    }

    this.state.removeFlowStep(this.flow, step);
    if (this.step && this.step.id === step.id) {
      // Deselect deleted step by navigating to flow home
      this.router.navigate(['flows', this.flow.id]);
    }
  }

  resetFlowStepConfig(): void {
    // Reset config params and tested flag of a step e.g. after changing the
    // selected service
    this.state.selectStep(Object.assign({}, this.step, {
      configParams: null,
      tested: null
    }));
  }

  /**
   * Flow Drafts
   */

  restoreFlow(): void {
    this.state.restoreFlow(this.flow.id);
  }

  /*
    Flow Runs
   */

  createFlowRun(): void {
    // Mock user ID
    let userId = '1';
    this.state.createFlowRun(this.flow.id, userId);
  }

  startFlowRun(payload: any): void {
    this.state.startFlowRun(this.flow.lastFlowRun.id, payload);
  }

  /*
    Status messages
  */

  showStatusMessage(message: string, type: string = 'success'): void {
    this.statusMessageText = message;
    this.statusMessageType = type;
    this.statusMessageShow = true;
  }

  hideStatusMessage(): void {
    this.statusMessageShow = false;
  }

  /*
    Helpers
  */

  showAllFlows() {
    this.router.navigate(['flows']);
  }

  selectStep(flowId: string, stepId: string) {
    this.router.navigate(['flows', this.flow.id, 'steps', stepId, 'select-service']);
  }

  flowPath(): string {
    return this.flow ? `/flows/${this.flow.id}` : '';
  }

  flowStepPath(): string {
    return this.step ? `${this.flowPath()}/steps/${this.step.id}` : '';
  }

  createFlowObject(flowData: Object): Flow {
    // NB Must assign all properties from the Flow model, otherwise optimistic
    // responses don't work
    return Object.assign({}, {
      id: UUID.UUID(),
      draft: true
    }, flowData) as Flow;
  }

  createStepObject(stepData: Object): Step {
    // NB Must assign all properties from the Step model, otherwise optimistic
    // responses don't work
    return Object.assign({}, {
      id: UUID.UUID(),
      configParams: null,
      tested: false
    }, stepData) as Step;
  }
}
