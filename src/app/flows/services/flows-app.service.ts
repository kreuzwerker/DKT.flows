import { Injectable } from '@angular/core';

import { Flow, Step } from './../models'
import { FlowsStateService } from './';

@Injectable()
export class FlowsAppService {
  flow: Flow = null;
  steps: Step[] = [];
  step: Step = null;

  // Current step preparation stage: select, configure, test
  // Gets set by child component, e.g. FlowHome, SelectServiceStep etc.
  stepStage = null;

  /*
    Step preparation stage
  */

  setStepStage(stage: string): void {
    this.stepStage = stage;
  }
}
