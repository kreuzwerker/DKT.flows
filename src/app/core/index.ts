import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

// Components
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    LoadingIndicatorComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
  ],
  exports: [
    LoadingIndicatorComponent,
  ],
  providers: [
  ]
})
export class CoreModule {}
