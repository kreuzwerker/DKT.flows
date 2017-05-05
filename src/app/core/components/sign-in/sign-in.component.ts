import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUiState, UserLoginService, IUserLogin } from './../../services';

@Component({
  selector: 'dkt-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css'],
})
export class SignInComponent {
  public busy: boolean = false;
  public busyPassword: boolean = false;

  constructor(
    public router: Router,
    private loginUi: LoginUiState
  ) {
    // Login component header
    this.loginUi.setLoginCompUIHeader('login');
  }

  /**
   * AWS UserPool sign in
   */

   public userData: IUserLogin = {
    username: '',
    password: ''
  };

  onSignIn(form) {
    if (form && form.valid) {
      this.busy = true;
      UserLoginService.signIn(this.userData)
      .then(() => {
        this.busy = false;
        this.loginUi.clearLoginCompUIMessage();
        this.router.navigate(['/']);
      }).catch((err: Error): void => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage('Wrong username or password.', 'error');
        console.log(err);
      });
    }
  }

  onForgotPassword(form) {
    if (form && this.userData.username != null) {
      this.busyPassword = true;
      UserLoginService.forgotPassword(this.userData.username)
      .then((data) => {
        this.busyPassword = false;
        this.loginUi.setLoginCompUIMessage('A verification code has been emailed to you.', 'success');
        this.router.navigate(['/login/forgot-password']);
      }).catch((err: any) => {
        this.busyPassword = false;
        this.loginUi.setLoginCompUIMessage(err.message, 'error');
        console.log('Forgot password request failed to initiate', err);
      });
    }
  }
}
