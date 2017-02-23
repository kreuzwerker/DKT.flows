/*
  Shared functionality in the Flows app
*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { Flow, Step, Service, ServiceType } from './../models';
import { FlowsListData } from './flow.gql';
import { FlowsStateService } from './';
import * as stepHelpers from './../utils/step.helpers';

@Injectable()
export class FlowsAppService {
  // Flows list
  flows: FlowsListData[];
  // Current selected flow / flow steps
  flow: Flow = null;
  steps: Step[] = [];
  // Current selected step
  step: Step = null;
  stepTypeName: string = null;
  // Current step preparation stage: select, configure, test
  // Gets set by child component, e.g. FlowHome, SelectService etc.
  stepStage = null;

  constructor(
    public state: FlowsStateService,
    private router: Router,
  ) {}

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

  saveFlowStep(): void {
    this.state.saveFlowStep(this.flow.id, this.step.id, this.step);
  }

  addFlowStep(): void {
    let lastStep = _.last(this.flow.steps);
    let position = lastStep ? lastStep.position + 1 : 0;
    let newStep = this.createStepObject(position);
    this.state.addFlowStep(this.flow.id, newStep).subscribe((step) => {
      // Select new step
      this.router.navigate(['flows', this.flow.id, 'steps', step.id, 'select-service']);
    });
  }

  removeFlowStep(step: Step): void {
    // Don't allow trigger step to be removed
    if (stepHelpers.getStepServiceType(step) === ServiceType.TRIGGER) {
      return;
    }

    this.state.removeFlowStep(this.flow.id, step);
    if (this.step && this.step.id === step.id) {
      // Deselect deleted step by navigating to flow home
      this.router.navigate(['flows', this.flow.id]);
    }
  }

  /*
    Helpers
  */

  flowPath(): string {
    return this.flow ? `/flows/${this.flow.id}` : '';
  }

  flowStepPath(): string {
    return this.step ? `${this.flowPath()}/steps/${this.step.id}` : '';
  }

  createStepObject(position: number = 0, service: Service = undefined): Step {
    return {
      id: 'new',
      position: position,
      service: service,
    };
  }
}
