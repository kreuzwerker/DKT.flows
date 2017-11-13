import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FlowsAppService, FlowsStateService } from './../../services';
import { Step, StepTestResultType } from './../../models';
import { getServiceResultType } from './../../utils';

@Component({
  selector: 'test-step',
  templateUrl: 'test-step.component.html',
  styleUrls: ['test-step.component.css']
  // NB make our life easier by not using OnPush for reactive forms, e.g. detect
  // form validation status after form has finished rendering.
})
export class TestStepComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  step: Step = null;
  samplePayload: String = '';

  showTestResults: boolean = false;
  stepTestResultData: string = null;
  stepTestResultType: StepTestResultType = null;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService
  ) {}

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('test');

    // Current selected step
    this.state
      .select('step')
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onSelectStep.bind(this), err =>
        console.log('error', err)
      );

    // Tested flow step
    this.state.testedFlowStep$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onTestedFlowStep.bind(this), err =>
        console.log('error', err)
      );
  }

  onSelectStep(step: Step) {
    if (!step || !step.service) {
      return;
    }

    this.step = step;
    this.samplePayload = this.step.service.samplePayload
      ? this.step.service.samplePayload
      : '';
  }

  testStep(payload: String) {
    this.state.testFlowStep(
      this.flowsApp.step.id,
      payload,
      this.flowsApp.step.configParams
    );
  }

  onTestedFlowStep(stepTest: any) {
    if (stepTest === 'loading') {
      this.showTestResults = false;
    } else if (stepTest.tested) {
      this.stepTestResultData = stepTest.result;
      this.stepTestResultType = getServiceResultType(stepTest.service);

      this.stepTestResultData = stepTest.result;
      if (this.stepTestResultType === StepTestResultType.JSON) {
        try {
          this.stepTestResultData = JSON.parse(this.stepTestResultData);
        } catch (err) {
          console.log(err);
        }
      }

      this.showTestResults = true;
    } else {
      this.showTestResults = false;
      this.stepTestResultData = null;
      this.stepTestResultType = StepTestResultType.ERROR;
    }
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
