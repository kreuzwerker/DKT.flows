import { Component, ViewEncapsulation } from '@angular/core';
import { LoginUiState, UserLoginService } from './../../services';

@Component({
  selector: 'dkt-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  constructor(public ui: LoginUiState) {}
}
