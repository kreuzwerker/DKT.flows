import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, FlowTriggerType } from './../../models/flow.model';
import * as helpers from './../../utils/flow.helpers';

@Component({
  selector: 'dkt-flow-header',
  templateUrl: 'flow-header.component.html',
  styleUrls: ['flow-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowHeaderComponent {
  @Input() flow: Flow;
  @Input() disableDraftControls: boolean = false;
  @Input() disableDeployControl: boolean = false;
  @Output() onTriggerFlowRun = new EventEmitter();
  @Output() onSaveFlowDraft = new EventEmitter();
  @Output() onDiscardFlowDraft = new EventEmitter();

  flowTriggerType = FlowTriggerType;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) {}

  isManualFlowRunLocked(): boolean {
    return this.flow.draft || !helpers.flowIsExecutable(this.flow);
  }

  truncate(str: string): string {
    const limit = 270;
    return str && str.length > limit ? str.substring(0, limit) + '...' : str;
  }
}
