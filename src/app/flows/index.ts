import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

// DKT module imports
import { CoreModule } from './../core';

// Containers
import { FlowsAppComponent } from './containers/flows-app/flows-app.component';
import { FlowHomeComponent } from './containers/flow-home/flow-home.component';
import { SelectServiceStepComponent } from './containers/select-service-step/select-service-step.component';
import { ConfigureStepComponent } from './containers/configure-step/configure-step.component';
import { TestStepComponent } from './containers/test-step/test-step.component';
import { ServicesComponent } from './containers/services/services.component';

// Components
import { FlowHeaderComponent } from './components/flow-header/flow-header.component';
import { FlowStepItemComponent } from './components/flow-step-item/flow-step-item.component';
import { FlowStepConfigNavComponent } from './components/flow-step-config-nav/flow-step-config-nav.component';
import { FlowStepNavButtonsComponent } from './components/flow-step-nav-buttons/flow-step-nav-buttons.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceIconComponent } from './components/service-icon/service-icon.component';
import { ServiceStepItemComponent } from './components/service-step-item/service-step-item.component';

// Services
import { FlowsApiService, FlowsAppService, FlowsStateService } from './services'

// Actions
import { FlowActions, StepActions, ServicesActions } from './actions';

// Effects
import { FlowEffects, ServicesEffects } from './effects'

const routes: Routes = [
  { path: 'flows/:flowId', component: FlowsAppComponent,
    children: [
      { path: '', component: FlowHomeComponent },
      { path: 'steps/:stepId/select-service-step', component: SelectServiceStepComponent },
      { path: 'steps/:stepId/configure', component: ConfigureStepComponent },
      { path: 'steps/:stepId/test', component: TestStepComponent }
    ] 
  }
];

@NgModule({
  declarations: [
    FlowsAppComponent,
    FlowHomeComponent,
    SelectServiceStepComponent,
    ConfigureStepComponent,
    TestStepComponent,
    FlowHeaderComponent,
    FlowStepItemComponent,
    FlowStepConfigNavComponent,
    FlowStepNavButtonsComponent,
    ServicesComponent,
    ServiceItemComponent,
    ServiceDetailComponent,
    ServiceIconComponent,
    ServiceStepItemComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
    EffectsModule.run(FlowEffects),
    EffectsModule.run(ServicesEffects),
  ],
  exports: [
  ],
  providers: [
    FlowsAppService,
    FlowsApiService,
    FlowsStateService,
    FlowActions,
    StepActions,
    ServicesActions,
  ]
})
export class FlowsModule {}
