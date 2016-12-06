import { Component } from '@angular/core';
import { FlowsAppService } from './../../services';

@Component({
  selector: 'configure-step',
  templateUrl: 'configure-step.component.html',
  styleUrls: ['configure-step.component.css']
})
export class ConfigureStepComponent {
  constructor(
    public flowsApp: FlowsAppService,
  ) {
    // Register current step preparation stage
    this.flowsApp.setStepStage('configure');
  }
}
