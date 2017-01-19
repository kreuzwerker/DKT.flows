import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FlowsAppService } from './../../services';

@Component({
  selector: 'test-step',
  templateUrl: 'test-step.component.html',
  styleUrls: ['test-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestStepComponent {
  constructor(
    public flowsApp: FlowsAppService,
  ) {
    // Register current step preparation stage
    this.flowsApp.setStepStage('test');
  }
}
