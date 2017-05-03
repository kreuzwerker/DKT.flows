import { Component, NgZone } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MdIconRegistry } from '@angular/material';
import { Router } from '@angular/router';
import { GoogleSignInConfig } from './../../config';
import { UserLoginService } from './../../services';

declare var gapi: any;

@Component({
  selector: 'dkt-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  constructor(
    public router: Router,
    public zone: NgZone,
    private mdIconRegistry: MdIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    // Register "google" icon
    mdIconRegistry.addSvgIcon(
      'google',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/icon/google.svg')
    );
  }

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      let auth2 = gapi.auth2.init(GoogleSignInConfig);

      auth2.attachClickHandler('googleSignInBtn', {
        scope: 'profile'
      }, (user) => this.onGoogleSignInSuccess(user), this.onGoogleSignInFailure);
    });
  }

  onGoogleSignInSuccess(user): void {
    // document.getElementById('name').innerText = "Signed in: " + user.getBasicProfile().getName();

    this.zone.run(() => {
      UserLoginService.signInSocial(user);

      // // TODO display welcome message
      // setTimeout(() => {
      //   this.router.navigate(['/']);
      // }, 1000)
      this.router.navigate(['/']);
    })
  }

  onGoogleSignInFailure(err): void {
    console.log('Google sign in error', err);
  }
}
