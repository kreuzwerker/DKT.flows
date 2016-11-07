import { Component, Input } from '@angular/core';
import { Step } from '../../models/step.model'

@Component({
  selector: 'dkt-flow-steps-list-item',
  templateUrl: 'flow-steps-list-item.component.html',
  styleUrls: ['flow-steps-list-item.component.css'],
})
export class FlowStepsListItemComponent {
  @Input() step: Step
}
