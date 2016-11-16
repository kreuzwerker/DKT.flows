import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

// Containers
import { SelectServiceStepComponent } from './containers/select-service-step/select-service-step.component';

// Components
import { FlowHeaderComponent } from './components/flow-header/flow-header.component';
import { FlowStepItemComponent } from './components/flow-step-item/flow-step-item.component';
import { FlowStepConfigNavComponent } from './components/flow-step-config-nav/flow-step-config-nav.component';
import { FlowStepNavButtonsComponent } from './components/flow-step-nav-buttons/flow-step-nav-buttons.component';
import { ServicesComponent } from './components/services/services.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { ServiceDetailComponent } from './components/service-detail/service-detail.component';
import { ServiceIconComponent } from './components/service-icon/service-icon.component';
import { ServiceStepItemComponent } from './components/service-step-item/service-step-item.component';

// Services
import { FlowsStateService } from './flows-state.service';

// Actions
import { FlowActions } from './actions';

const routes: Routes = [
  {path: 'flows/1/select-service-step', component: SelectServiceStepComponent}
];

@NgModule({
  declarations: [
    SelectServiceStepComponent,
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
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
  ],
  exports: [
  ],
  providers: [
    FlowsStateService,
    FlowActions
  ]
})
export class FlowsModule {}

export { FlowsStateService } from './flows-state.service'
