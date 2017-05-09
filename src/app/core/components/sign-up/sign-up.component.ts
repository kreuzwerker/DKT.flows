import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUiState, IUserRegistration, UserLoginService, UserRegistrationService } from './../../services';

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html',
  styleUrls: ['sign-up.component.css']
})
export class SignUpComponent {
  public busy: boolean = false;

  public userData: IUserRegistration = {
    username: '',
    password: '',
    email: '',
    givenName: '',
    familyName: ''
  };

  constructor(
    public router: Router,
    private loginUi: LoginUiState
  ) {
    // Login component header
    this.loginUi.setLoginCompUIHeader('signup');
  }

  onSignUp(form) {
    if (form && form.valid) {
      this.busy = true;
      UserRegistrationService.signUp(this.userData).then(() => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage('Sign up successful.', 'success');
        this.router.navigate(['login', 'confirm']);
      }).catch((err: Error) => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage(err.message, 'error');
        console.log(err);
      });
    }
  }
}
