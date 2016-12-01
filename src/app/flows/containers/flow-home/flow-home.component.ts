import { Component } from '@angular/core';

import { FlowsAppService } from './../../services'

@Component({
  selector: 'flow-home',
  templateUrl: 'flow-home.component.html',
  styleUrls: ['flow-home.component.css']
})
export class FlowHomeComponent {
  constructor(
    public flowsApp: FlowsAppService
  ) {
    // Register current step preparation stage
    this.flowsApp.setStepStage(null);
  }
}
