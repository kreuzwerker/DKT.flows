import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUtil, UserLoginService } from './../../services';
import { GoogleSignInConfig } from './../../config';
import { FlowsStateService } from './../../../flows/services';

declare var gapi: any;

@Component({
  selector: 'dkt-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})
export class AccountComponent {
  constructor(
    public state: FlowsStateService,
    public router: Router,
  ) {}

  ngAfterViewInit() {
    gapi.load('auth2', () => {
      gapi.auth2.init(GoogleSignInConfig);
    });
  }

  signOut(): void {
    // Sign out form Cognito
    UserLoginService.signOut();

    // Sign out from Google
    try {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        // Redirect to login
        this.router.navigate(['/login']);
      });
    } catch (e) {
    }
  }

  getUsername(): string {
    return CognitoUtil.getUsername();
  }

  getAvatar(): string {
    let profile:any = CognitoUtil.getUserProfile();
    return profile && profile.imageUrl || null;
  }
}
