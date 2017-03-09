import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FlowsAppService, FlowsStateService, FormBuilderService } from './../../services';
import { FormGroup } from '@angular/forms';
import { DynamicFormService, DynamicFormControlModel } from "@ng2-dynamic-forms/core";
import { Step } from './../../models';

@Component({
  selector: 'configure-step',
  templateUrl: 'configure-step.component.html',
  styleUrls: ['configure-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigureStepComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  step: Step = null;
  formModel: DynamicFormControlModel[];
  formGroup: FormGroup;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    private formBuilder: FormBuilderService,
    private formService: DynamicFormService
  ) { }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('configure');

    // Current selected step
    this.state.select('step').takeUntil(this.ngOnDestroy$).subscribe(
      this.onSelectStep.bind(this),
      (err) => console.log('error', err)
    );
  }

  onSelectStep(step: Step) {
    if (step === null) {
      return;
    }

    this.step = step;

    // MOCK
    // let values = this.step.configParams;
    let values = this.mockFormValues[this.step.id] || {};

    this.initForm(this.step.service, values);
    this.cd.markForCheck();
  }

  initForm(schema, values) {
    // Create form model from service config form schema
    this.formModel = this.formBuilder.createFormModel(schema, values);

    // Create form group
    this.formGroup = this.formService.createFormGroup(this.formModel);
  }

  mockFormValues = {}

  saveForm() {
    // MOCK
    // this.step.configParams = values;
    this.mockFormValues[this.step.id] = this.formGroup.value;
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
