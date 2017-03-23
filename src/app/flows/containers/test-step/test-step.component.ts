import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FlowsAppService, FlowsStateService } from './../../services';
import { Step } from './../../models';

@Component({
  selector: 'test-step',
  templateUrl: 'test-step.component.html',
  styleUrls: ['test-step.component.css'],
  // NB make our life easier by not using OnPush for reactive forms, e.g. detect
  // form validation status after form has finished rendering.
})
export class TestStepComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  step: Step = null;
  testPayload: String = '';

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
  ) {}

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('test');

    // Current selected step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectStep.bind(this),
      (err) => console.log('error', err)
    );
  }

  onSelectStep(step: Step) {
    if (typeof step === 'undefined' || step === null || typeof step.service === 'undefined') {
      return;
    }

    this.step = step;
    // this.testPayload = this.step.service.testPayload ? this.step.service.testPayload : '';
    this.testPayload = 'Test payload string';
  }

  testStep(payload: String) {
    this.state.testFlowStep(this.flowsApp.step.id, payload);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
