import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dkt-flow-step-nav-buttons',
  templateUrl: 'flow-step-nav-buttons.component.html',
  styleUrls: ['flow-step-nav-buttons.component.css']
})
export class FlowStepNavButtonsComponent {
  @Input() cancelPath: string;
  @Input() continuePath: string;

  constructor(public router: Router) {}

  cancel() {
    this.router.navigate([this.cancelPath]);
  }

  continue() {
    this.router.navigate([this.continuePath]);
  }
}
