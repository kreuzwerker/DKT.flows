import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

// Features
import { SelectServiceStepComponent } from './features/select-service-step/select-service-step.component';

// Shared
import { FlowStepsListItemComponent } from './shared/flow-steps-list-item/flow-steps-list-item.component';
import { ServicesComponent } from './shared/services/services.component';
import { ServiceComponent } from './shared/service/service.component';

const routes: Routes = [
  {path: 'flows/1/select-service-step', component: SelectServiceStepComponent}
];

@NgModule({
  declarations: [
    SelectServiceStepComponent,
    FlowStepsListItemComponent,
    ServicesComponent,
    ServiceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule.forRoot(),
  ]
})
export class FlowModule {}
