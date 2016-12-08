import { Injectable } from '@angular/core';

import { Flow, Step } from './../models'
import { FlowsStateService } from './';
import * as stepHelpers from './../utils/step.helpers';

@Injectable()
export class FlowsAppService {
  // Current selected flow / flow steps
  flow: Flow = null;
  steps: Step[] = [];
  // Current selected step
  step: Step = null;
  stepTypeName: string = null;

  constructor(public state: FlowsStateService) {}

  setStep(step: Step): void {
    this.step = step;
    this.stepTypeName = stepHelpers.getStepServiceStepTypeName(step);
  }

  /*
    Step preparation stage
  */

  // Current step preparation stage: select, configure, test
  // Gets set by child component, e.g. FlowHome, SelectServiceStep etc.
  stepStage = null;

  setStepStage(stage: string): void {
    this.stepStage = stage;
  }

  /*
    Persistance
  */

  saveFlow(): void {
    this.state.saveFlow(this.flow.id, this.flow);
  }

  saveFlowStep(): void {
    this.state.saveFlowStep(this.flow.id, this.step.id, this.step);
  }

  /*
    Helpers
  */

  flowPath(): string {
    return `/flows/${this.flow.id}`
  }

  flowStepPath(): string {
    return `${this.flowPath()}/steps/${this.step.id}`
  }
}
