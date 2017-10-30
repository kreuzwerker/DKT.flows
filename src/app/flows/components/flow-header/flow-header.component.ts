import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() disableDraftControls: boolean = false;
  @Input() disableDeployControl: boolean = false;
  @Output() onTriggerFlowRun = new EventEmitter();
  @Output() onSaveFlowDraft = new EventEmitter();
  @Output() onDiscardFlowDraft = new EventEmitter();

  constructor(
    public flowsApp: FlowsAppService
  ) { }

  isManualFlowRunLocked(): boolean {
    return this.flow.draft || !helpers.flowIsExecutable(this.flow);
  }

  truncate(str: string): string {
    return (str && str.length > 70) ? str.substring(0, 70) + '...' : str;
  }
}
