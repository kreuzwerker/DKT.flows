import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AccountComponent } from './components/account/account.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

// Services
import { LoginGuard, UserLoginService, UserRegistrationService } from './services';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [
    AccountComponent,
    LoadingIndicatorComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  exports: [
    AccountComponent,
    LoadingIndicatorComponent,
    LoginComponent,
  ],
  providers: [
    UserLoginService,
    UserRegistrationService,
    LoginGuard
  ]
})
export class CoreModule {}
