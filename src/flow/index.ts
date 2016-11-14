import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

// Features
import { SelectServiceStepComponent } from './features/select-service-step/select-service-step.component';

// Shared
import { FlowStepItemComponent } from './shared/flow-step-item/flow-step-item.component';
import { FlowStepConfigNavComponent } from './shared/flow-step-config-nav/flow-step-config-nav.component';
import { FlowStepNavButtonsComponent } from './shared/flow-step-nav-buttons/flow-step-nav-buttons.component';
import { ServicesComponent } from './shared/services/services.component';
import { ServiceItemComponent } from './shared/service-item/service-item.component';
import { ServiceDetailComponent } from './shared/service-detail/service-detail.component';
import { ServiceIconComponent } from './shared/service-icon/service-icon.component';
import { ServiceStepItemComponent } from './shared/service-step-item/service-step-item.component';

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
  ]
})
export class FlowModule {}
