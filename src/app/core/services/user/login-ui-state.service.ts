import { Injectable } from '@angular/core';

@Injectable()
export class LoginUiState {
  /**
   * Login Component UI state
   */

  public title = 'Log in';
  public currentNav = 'logIn';
  public message = '';
  public messageType = 'success';

  public setLoginCompUIHeader(type: string): void {
    if (type == 'login') {
      this.title = 'Log in';
      this.currentNav = 'logIn';
    } else {
      this.title = 'Sign up';
      this.currentNav = 'signUp';
    }
  }

  public setLoginCompUIMessage(message: string, messageType: string): void {
    this.message = message;
    this.messageType = messageType;
  }

  public clearLoginCompUIMessage(): void {
    this.message = '';
  }
}
