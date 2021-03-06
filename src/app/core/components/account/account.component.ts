import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUtil, UserLoginService } from './../../services';
import { googleSignInConfig } from './../../config';
import { FlowsStateService } from './../../../flows/services';

declare var gapi: any;

@Component({
  selector: 'dkt-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})
export class AccountComponent implements AfterViewInit {
  constructor(
    public state: FlowsStateService,
    public router: Router,
  ) {}

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init(googleSignInConfig);
    });
  }

  signOut(): void {
    // Sign out form Cognito
    UserLoginService.signOut();

    // Sign out from Google
    try {
      let auth2 = gapi.auth2.getAuthInstance();
      // Redirect to login
      auth2.signOut().then(() => {
        this.router.navigate(['/login']);
      }).catch(err => {
        this.router.navigate(['/login']);
      });
    } catch (e) {
    }
  }

  getUsername(): string {
    let profile = CognitoUtil.getUserProfile();
    if (!profile) {
      return CognitoUtil.getUsername();
    } else {
      return profile['given_name'] + ' ' + profile['family_name'];
    }
  }

  getAvatar(): string {
    let profile: any = CognitoUtil.getUserProfile();
    return profile && profile.imageUrl || null;
  }

  goTo(path): void {
    this.router.navigate([path]);
  }
}
