import { Component } from '@angular/core';
import { Router } from '@angular/router';import { LoginUiState, UserLoginService, CognitoUtil } from './../../services';

@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.component.html',
  styleUrls: ['forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public busy: boolean = false;

  constructor(
    public router: Router,
    private loginUi: LoginUiState
  ) {
    // Login component header
    this.loginUi.setLoginCompUIHeader('login');
  }

  formData: {
    verificationCode?: string,
    password?: string
  } = {};

  onUpdatePassword(form) {
    if (form && form.valid) {
      this.busy = true;

      UserLoginService.confirmForgotPassword(CognitoUtil.getUsername(), this.formData.verificationCode, this.formData.password)
      .then(() => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage('Password successfully changed. You can now sign-in using your username/password.', 'success');
        this.router.navigate(['login']);
      }).catch((err: any) => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage(err.message, 'error');
        console.error(err);
      });
    }
  }
}
