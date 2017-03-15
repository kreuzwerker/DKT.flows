// KNOWN ISSUES
// - warning message "The <template> element is deprecated...":
//   https://github.com/angular/material2/issues/3301
// - warning message "It looks like you're using the disabled attribute...":
//   https://github.com/udos86/ng2-dynamic-forms/issues/293

import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FlowsAppService, FlowsStateService, FormBuilderService } from './../../services';
import { FormGroup } from '@angular/forms';
import { DynamicFormService, DynamicFormControlModel } from '@ng2-dynamic-forms/core';
import { Step } from './../../models';

@Component({
  selector: 'configure-step',
  templateUrl: 'configure-step.component.html',
  styleUrls: ['configure-step.component.css'],
  encapsulation: ViewEncapsulation.None
  // NB make our life easier by not using OnPush for reactive forms, e.g. detect
  // form validation status after form has finished rendering.
})
export class ConfigureStepComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  step: Step = null;
  formModel: DynamicFormControlModel[];
  configForm: FormGroup;

  constructor(
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
    if (typeof step === 'undefined' || typeof step.service === 'undefined') {
      return;
    }

    this.step = step;
    let values = this.step.configParams && this.reduceValues(this.step.configParams) || {};

    this.initForm(this.step.service.configSchema, values);
  }

  initForm(schema, values) {
    // Create form model from service config form schema
    this.formModel = this.formBuilder.createFormModel(schema, values);

    // Create config form
    this.configForm = this.formService.createFormGroup(this.formModel);
  }

  saveForm() {
    if (this.configForm.valid) {
      let values = this.mapValues(this.configForm.value);
      this.state.dispatch(this.state.actions.setStepConfig(values));
      this.flowsApp.saveFlowStep();
    }
  }

  reduceValues(values) {
    return values.reduce((a, b) => {
      let val = b.value;
      // Cast boolean values
      if (val === 'true' || val === 'false') {
        val = JSON.parse(val);
      }
      return Object.assign(a, { [b.id]: val });
    }, {});
  }

  mapValues(values) {
    return Object.keys(values).map((key) => {
      return { id: key, value: values[key] };
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
