import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dkt-flow-step-nav-buttons',
  templateUrl: 'flow-step-nav-buttons.component.html',
  styleUrls: ['flow-step-nav-buttons.component.css']
})
export class FlowStepNavButtonsComponent {
  @Input() backPath: string;
  @Input() backLabel: string;
  @Input() continuePath: string;
  @Input() continueLabel: string;

  constructor(public router: Router) {}

  back() {
    this.router.navigate([this.backPath]);
  }

  continue() {
    this.router.navigate([this.continuePath]);
  }
}
