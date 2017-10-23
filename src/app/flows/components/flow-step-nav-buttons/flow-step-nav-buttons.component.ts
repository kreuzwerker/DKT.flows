import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() onContinue: any;
  @Input() continuePath: string;
  @Input() continueLabel: string;
  @Input() continueDisabled: boolean = false;

  continueIsLoading: boolean = false;

  constructor(public router: Router) {}

  back() {
    this.router.navigate([this.backPath]);
  }

  continue() {
    if (this.onContinue) {
      let res = this.onContinue();
      if (typeof res === 'boolean') {
        // Callback has finished, continue if successfull
        if (res) {
          this.doContinue();
        }
      } else if (typeof res === 'object') {
        // Callback hasn't finished yet, wait for result
        this.continueIsLoading = true;
        res.subscribe((success) => {
          this.continueIsLoading = false;
          if (success) {
            this.doContinue();
          }
        });
      }
    } else {
      this.doContinue();
    }
  }

  doContinue() {
    // NB wait for changes of onContinue have an effect
    setTimeout(() => {
      this.router.navigate([this.continuePath]);
    }, 1);
  }
}
