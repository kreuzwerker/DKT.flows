import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FlowsAppService } from './../../services';

@Component({
  selector: 'configure-step',
  templateUrl: 'configure-step.component.html',
  styleUrls: ['configure-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ConfigureStepComponent implements OnInit {
  constructor(
    public flowsApp: FlowsAppService,
  ) { }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('configure');
  }
}
