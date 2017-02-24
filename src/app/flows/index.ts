import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

// DKT module imports
import { CoreModule } from './../core';

// Containers
import { FlowsListComponent } from './containers/flows-list/flows-list.component';
import { FlowsAppComponent } from './containers/flows-app/flows-app.component';
import { FlowHomeComponent } from './containers/flow-home/flow-home.component';
import { SelectServiceComponent } from './containers/select-service/select-service.component';
import { ConfigureStepComponent } from './containers/configure-step/configure-step.component';
import { TestStepComponent } from './containers/test-step/test-step.component';
import { ProvidersComponent } from './containers/providers/providers.component';

// Components
import { NewFlowDialogComponent } from './components/new-flow-dialog/new-flow-dialog.component';
import { FlowHeaderComponent } from './components/flow-header/flow-header.component';
import { FlowStepItemComponent } from './components/flow-step-item/flow-step-item.component';
import { FlowStepConfigNavComponent } from './components/flow-step-config-nav/flow-step-config-nav.component';
import { FlowStepNavButtonsComponent } from './components/flow-step-nav-buttons/flow-step-nav-buttons.component';
import { ProviderItemComponent } from './components/provider-item/provider-item.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { ProviderIconComponent } from './components/provider-icon/provider-icon.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';

// Services
import { FlowsApiService, FlowsAppService, FlowsStateService } from './services';

// States
import { FlowsAppActions, FlowsAppEffects } from './states';

const routes: Routes = [
  { path: 'flows', component: FlowsListComponent },
  { path: 'flows/:flowId', component: FlowsAppComponent,
    children: [
      { path: '', component: FlowHomeComponent },
      { path: 'steps/:stepId/select-service', component: SelectServiceComponent },
      { path: 'steps/:stepId/configure', component: ConfigureStepComponent },
      { path: 'steps/:stepId/test', component: TestStepComponent }
    ]
  }
];

@NgModule({
  declarations: [
    FlowsListComponent,
    FlowsAppComponent,
    FlowHomeComponent,
    SelectServiceComponent,
    ConfigureStepComponent,
    TestStepComponent,
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
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    EffectsModule.run(FlowsAppEffects),
  ],
  exports: [
  ],
  providers: [
    FlowsAppService,
    FlowsApiService,
    FlowsStateService,
    FlowsAppActions,
  ],
  entryComponents: [ NewFlowDialogComponent ],
})
export class FlowsModule {}
