import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dkt-flow-step-nav-buttons',
  templateUrl: 'flow-step-nav-buttons.component.html',
  styleUrls: ['flow-step-nav-buttons.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowStepNavButtonsComponent {
  @Input() backPath: string;
  @Input() backLabel: string;
  @Input() continuePath: string;
  @Input() continueLabel: string;
  @Input() continueDisabled: boolean = false;

  constructor(public router: Router) {}

  back() {
    this.router.navigate([this.backPath]);
  }

  continue() {
    this.router.navigate([this.continuePath]);
  }
}
