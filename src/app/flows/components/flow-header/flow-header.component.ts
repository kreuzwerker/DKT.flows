import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FlowsAppService } from './../../services';
import { Flow } from './../../models/flow.model';

@Component({
  selector: 'dkt-flow-header',
  templateUrl: 'flow-header.component.html',
  styleUrls: ['flow-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowHeaderComponent {
  @Input() flow: Flow;

  constructor(
    public flowsApp: FlowsAppService
  ) { }

  createFlowRun() {
    this.flowsApp.createFlowRun();
  }
}
