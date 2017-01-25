import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FlowsAppService } from './../../services';

@Component({
  selector: 'test-step',
  templateUrl: 'test-step.component.html',
  styleUrls: ['test-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestStepComponent implements OnInit {
  constructor(
    public flowsApp: FlowsAppService,
  ) {}

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('test');
  }
}
