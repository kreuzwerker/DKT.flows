import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsCoreModule } from '@ng-dynamic-forms/core';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { DktMaterialModule } from './../dkt-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

// DKT module imports
import { CoreModule } from './../core';

// Containers
import { AccountsComponent } from './containers/accounts/accounts.component';
import { FlowsComponent } from './containers/flows/flows.component';
import { FlowsListComponent } from './containers/flows-list/flows-list.component';
import { FlowsAppComponent } from './containers/flows-app/flows-app.component';
import { FlowHomeComponent } from './containers/flow-home/flow-home.component';
import { FlowSettingsComponent } from './containers/flow-settings/flow-settings.component';
import { FlowLogsComponent } from './containers/flow-logs/flow-logs.component';
import { SelectServiceComponent } from './containers/select-service/select-service.component';
import { ConfigureStepComponent } from './containers/configure-step/configure-step.component';
import { TestStepComponent } from './containers/test-step/test-step.component';
import { ProvidersComponent } from './containers/providers/providers.component';

// Components
import { DeleteFlowDialogComponent } from './components/delete-flow-dialog/delete-flow-dialog.component';
import { NewFlowDialogComponent } from './components/new-flow-dialog/new-flow-dialog.component';
import { FlowHeaderComponent } from './components/flow-header/flow-header.component';
import { FlowStepItemComponent } from './components/flow-step-item/flow-step-item.component';
import { FlowStepConfigNavComponent } from './components/flow-step-config-nav/flow-step-config-nav.component';
import { FlowStepNavButtonsComponent } from './components/flow-step-nav-buttons/flow-step-nav-buttons.component';
import { ProviderItemComponent } from './components/provider-item/provider-item.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { ProviderIconComponent } from './components/provider-icon/provider-icon.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { StatusMessageComponent } from './components/status-message/status-message.component';
import { StepConfigSummaryComponent } from './components/step-config-summary/step-config-summary.component';
import { StepTestResultComponent } from './components/step-test-result/step-test-result.component';
import { TriggerFlowRunDialogComponent } from './components/trigger-flow-run-dialog/trigger-flow-run-dialog.component';
// - Accounts
import { DeleteAccountDialogComponent } from './components/delete-account-dialog/delete-account-dialog.component';
import { AccountDialogComponent } from './components/account-dialog/account-dialog.component';

// Services
import { AccountsApiService, AccountsStateService } from './services';
import { FlowsApiService, FlowsAppService, FlowsStateService, FormBuilderService } from './services';
import { LoginGuard } from './../core/services/user/login-guard.service';

// States
import { FlowsAppActions, FlowsAppEffects } from './states';

const routes: Routes = [
  { path: 'flows', component: FlowsComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: FlowsListComponent },
      { path: 'accounts', component: AccountsComponent },
    ]
  },
  { path: 'flows/:flowId', component: FlowsAppComponent, canActivate: [LoginGuard],
    children: [
      { path: '', component: FlowHomeComponent },
      { path: 'logs', component: FlowLogsComponent },
      { path: 'logs/:status', component: FlowLogsComponent },
      { path: 'settings', component: FlowSettingsComponent },
      { path: 'settings/triggering', component: FlowSettingsComponent },
      { path: 'steps/:stepId/select-service', component: SelectServiceComponent },
      { path: 'steps/:stepId/configure', component: ConfigureStepComponent },
      { path: 'steps/:stepId/test', component: TestStepComponent }
    ]
  }
];

@NgModule({
  declarations: [
    FlowsComponent,
    FlowsListComponent,
    FlowsAppComponent,
    FlowHomeComponent,
    FlowSettingsComponent,
    FlowLogsComponent,
    SelectServiceComponent,
    ConfigureStepComponent,
    TestStepComponent,
    DeleteFlowDialogComponent,
    NewFlowDialogComponent,
    FlowHeaderComponent,
    FlowStepItemComponent,
    FlowStepConfigNavComponent,
    FlowStepNavButtonsComponent,
    ProvidersComponent,
    ProviderItemComponent,
    ProviderDetailComponent,
    ProviderIconComponent,
    ServiceItemComponent,
    StatusMessageComponent,
    StepConfigSummaryComponent,
    StepTestResultComponent,
    TriggerFlowRunDialogComponent,
    // Accounts
    AccountsComponent,
    AccountDialogComponent,
    DeleteAccountDialogComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule.forRoot(),
    DynamicFormsMaterialUIModule,
    RouterModule.forChild(routes),
    DktMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    EffectsModule.run(FlowsAppEffects)
  ],
  exports: [],
  providers: [
    AccountsApiService,
    AccountsStateService,
    FlowsAppService,
    FlowsApiService,
    FlowsStateService,
    FlowsAppActions,
    FormBuilderService
  ],
  entryComponents: [
    NewFlowDialogComponent,
    DeleteFlowDialogComponent,
    TriggerFlowRunDialogComponent,
    // Accounts
    DeleteAccountDialogComponent,
    AccountDialogComponent,
  ]
})
export class FlowsModule {}
