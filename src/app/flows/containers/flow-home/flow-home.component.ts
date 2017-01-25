import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { FlowsAppService } from './../../services';

@Component({
  selector: 'flow-home',
  templateUrl: 'flow-home.component.html',
  styleUrls: ['flow-home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowHomeComponent implements OnInit {
  constructor(
    public flowsApp: FlowsAppService
  ) { }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage(null);
  }
}
