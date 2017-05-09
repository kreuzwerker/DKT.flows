import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UserLoginService } from './../../services';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  canActivate() {
    if (UserLoginService.isSignedIn() === false) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}