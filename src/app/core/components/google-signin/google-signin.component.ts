import { Component, NgZone, Input, AfterViewInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { googleSignInConfig } from './../../config';
import { LoginUiState, UserLoginService } from './../../services';

declare var gapi: any;

@Component({
  selector: 'dkt-google-signin',
  templateUrl: 'google-signin.component.html',
  styleUrls: ['google-signin.component.css']
})
export class GoogleSigninComponent implements AfterViewInit {
  @Input() action: string = 'Log in';

  constructor(
    public router: Router,
    public zone: NgZone,
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private loginUi: LoginUiState
  ) {
    // Register "google" icon
    matIconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/google.svg')
    );
  }

  /**
   * Google SignIn
   */

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      let auth2 = gapi.auth2.init(googleSignInConfig);

      auth2.attachClickHandler('googleSignInBtn', {
        scope: 'profile'
      }, (user) => this.onGoogleSignInSuccess(user), this.onGoogleSignInFailure);
    });
  }

  onGoogleSignInSuccess(user): void {
    this.zone.run(() => {
      this.loginUi.clearLoginCompUIMessage();
      UserLoginService.signInSocial(user);
      this.router.navigate(['/']);
    });
  }

  onGoogleSignInFailure(err): void {
    this.zone.run(() => {
      this.loginUi.setLoginCompUIMessage('An error occured.', 'error');
      console.log('Google SignIn error', err);
    });
  }
}
