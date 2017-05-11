import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUiState, UserLoginService, UserRegistrationService } from './../../services';

@Component({
  selector: 'confirm-sign-up',
  templateUrl: 'confirm-sign-up.component.html',
  styleUrls: ['confirm-sign-up.component.css']
})
export class ConfirmSignUpComponent {
  public busy: boolean = false;

  public registrationCode = {
    code: undefined
  };

  constructor(
    private router: Router,
    private loginUi: LoginUiState
  ) {
    // Login component header
    this.loginUi.setLoginCompUIHeader('signup');
  }

  onConfirmSignUp(form) {
    if (form && form.valid) {
      this.busy = true;
      UserRegistrationService.confirmSignUp(this.registrationCode.code.toString())
      .then(() => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage(
          'You are now successfully registered! You can now sign-in using your username/password.',
          'success'
        );
        this.router.navigate(['login']);
      }).catch((err: Error) => {
        this.busy = false;
        this.loginUi.setLoginCompUIMessage('Verification failed.', 'error');
        console.error(err);
      });
    }
  }
}
