import { Component, OnInit } from '@angular/core';

import { Flow, Step } from '../../models'
import { FlowsStateService } from './../../flows-state.service';

@Component({
  selector: 'dkt-select-service-step',
  templateUrl: 'select-service-step.component.html',
  styleUrls: ['select-service-step.component.css']
})

export class SelectServiceStepComponent  {
  steps: Step[];

  constructor(public state: FlowsStateService) {
  }

  ngOnInit() {
    this.state.loadFlow('1');
    this.state.flow$.subscribe((flow) => {
      this.steps = flow.steps

      this.state.selectStep(flow.steps[0]);
    });
  }
}
