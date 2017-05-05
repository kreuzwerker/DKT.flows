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
}
