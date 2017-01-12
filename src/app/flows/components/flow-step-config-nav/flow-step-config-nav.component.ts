import { Component, Input } from '@angular/core';

@Component({
  selector: 'dkt-flow-step-config-nav',
  templateUrl: 'flow-step-config-nav.component.html',
  styleUrls: ['flow-step-config-nav.component.css']
})
export class FlowStepConfigNavComponent {
  @Input() current: string;
  @Input() type: string;

  showStepNav(step: string): boolean {
    if (this.current === 'select') {
      // Show only the 'select' step
      return step === 'select';
    } else {
      // Show all steps
      return true;
    }
  }

  getStepIconType(step: string): string {
    if (step === 'select') {
      return this.current === 'select' ? 'number' : 'check';
    } else if (step === 'configure') {
      if (this.current === 'select' || this.current === 'configure') return 'number';
      else return 'check';
    } else if (step === 'test') {
      return 'number';
    } else {
      return 'undefined';
    }
  }
}
