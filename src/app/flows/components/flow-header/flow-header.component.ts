import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FlowsAppService } from './../../services';
import { Flow } from './../../models/flow.model';
import * as helpers from './../../utils/flow.helpers';

@Component({
  selector: 'dkt-flow-header',
  templateUrl: 'flow-header.component.html',
  styleUrls: ['flow-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowHeaderComponent {
  @Input() flow: Flow;
  @Input() isSavingFlowDraft: boolean = false;
  @Output() onTriggerFlowRun = new EventEmitter();
  @Output() onSaveFlowDraft = new EventEmitter();
  @Output() onDiscardFlowDraft = new EventEmitter();

  constructor(
    public flowsApp: FlowsAppService
  ) { }

  isManualFlowRunLocked() {
    return this.flow.draft || !helpers.flowIsExecutable(this.flow);
  }
}
