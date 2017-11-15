import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Containers
import { ErrorComponent } from './containers/error/error.component';

// Components
import { AccountComponent } from './components/account/account.component';
import { ConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GoogleSigninComponent } from './components/google-signin/google-signin.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { RenderComponent } from './components/render/render.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

// Directives
import { EqualValidator } from './directives/equal-validator.directive';

// Services
import { LoginGuard, LoginUiState, StateService, UserLoginService, UserRegistrationService } from './services';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    children: [
      { path: '', component: SignInComponent },
      { path: 'confirm', component: ConfirmSignUpComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  },
  { path: 'error/:code/:entity', component: ErrorComponent, canActivate: [LoginGuard] }
];

@NgModule({
  declarations: [
    AccountComponent,
    ConfirmSignUpComponent,
    EqualValidator,
    ErrorComponent,
    ForgotPasswordComponent,
    GoogleSigninComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    MainNavComponent,
    RenderComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule.forRoot(),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountComponent,
    LoadingIndicatorComponent,
    LoginComponent,
    MainNavComponent,
    RenderComponent,
  ],
  providers: [
    LoginGuard,
    LoginUiState,
    StateService,
    UserLoginService,
    UserRegistrationService,
  ]
})
export class CoreModule {}
