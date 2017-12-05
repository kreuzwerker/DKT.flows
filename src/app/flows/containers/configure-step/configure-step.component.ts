// KNOWN ISSUES
// - warning message "The <template> element is deprecated...":
//   https://github.com/angular/material2/issues/3301
// - warning message "It looks like you're using the disabled attribute...":
//   https://github.com/udos86/ng-dynamic-forms/issues/293

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AccountsStateService, FlowsAppService, FlowsStateService, FormBuilderService } from './../../services';
import { FormGroup } from '@angular/forms';
import { DynamicFormService, DynamicFormControlModel } from '@ng-dynamic-forms/core';
import { Step, StepConfigParamsInput } from './../../models';
import { AccountDialogComponent } from './../../components/account-dialog/account-dialog.component';

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
  dialogConfig: MatDialogConfig;
  accountIsDirty: boolean = false;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    public accountsState: AccountsStateService,
    private formBuilder: FormBuilderService,
    private formService: DynamicFormService,
    public dialog: MatDialog
  ) {
    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage('configure');

    // Current selected step
    this.state
      .select('step')
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onSelectStep.bind(this), err =>
        console.log('error', err)
      );
  }

  onSelectStep(step: Step) {
    if (!step || !step.service) {
      return;
    }

    this.step = step;
    if (typeof this.step.service.configSchema !== 'undefined') {
      let values =
        (this.step.configParams && this.reduceValues(this.step.configParams)) ||
        {};
      this.initForm(this.step.service.configSchema, values);
    }
  }

  /*
    Connected Account
  */

  hasConnectedAccount(): boolean {
    return this.step.account !== null;
  }

  requireConnectAccount(): boolean {
    if (!this.step.service.requiredAccountType) {
      return false;
    } else if (!this.hasConnectedAccount()) {
      return true;
    } else {
      return (
        this.step.service.requiredAccountType !== this.step.account.accountType
      );
    }
  }

  openAccountDialog() {
    this.accountsState.loadAccounts(this.step.service.requiredAccountType);

    let dialogRef = this.dialog.open(AccountDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.requiredAccountType = this.step.service.requiredAccountType;
    dialogRef.componentInstance.selectedAccount = this.step.account;
    dialogRef.componentInstance.account = {
      id: null,
      key: null,
      name: '',
      accountType: this.step.service.requiredAccountType
    };

    dialogRef.afterClosed().subscribe(account => {
      if (account) {
        this.state.dispatch(this.state.actions.setStepAccount(account));
        this.accountIsDirty = true;
      }
    });
  }

  /*
    Configuration Form
  */

  initForm(schema, values) {
    // Create form model from service config form schema
    this.formModel = this.formBuilder.createFormModel(schema, values);

    // Create config form
    this.configForm = this.formService.createFormGroup(this.formModel);
  }

  getContinueLabel() {
    return this.configForm.dirty ? 'Save and continue' : 'Continue';
  }

  // NB bind to this context
  saveForm = (): boolean | Observer<boolean> => {
    if (!this.configForm.valid) {
      return false;
    }

    // No need to save if step has already been configured and values haven't changed
    // (including the connected account)
    if (this.step.configParams !== null && !this.configForm.dirty && !this.accountIsDirty) {
      return true;
    }

    // Update the step configuration and save the step
    let values = this.mapValues(this.configForm.value);
    this.state.dispatch(this.state.actions.setStepConfig(values));
    this.flowsApp.saveFlowStep();
    this.accountIsDirty = false;

    // Return immediately, relying on optimistic response from updateStep mutation
    return true;
  }

  reduceValues(values) {
    return values.reduce((a, b) => {
      let val = b.value;
      // Cast boolean values
      if (val === 'true' || val === 'false') {
        val = JSON.parse(val);
      }
      return Object.assign(a, { [b.fieldId]: val });
    }, {});
  }

  mapValues(values) {
    return Object.keys(values).map(key => {
      return { fieldId: key, value: values[key] };
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
