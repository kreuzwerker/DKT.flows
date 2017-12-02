import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Account } from './../../models';
import { AccountsStateService } from './../../services';

@Component({
  selector: 'select-account-dialog',
  templateUrl: 'select-account-dialog.component.html',
  styleUrls: ['select-account-dialog.component.css']
})
export class SelectAccountDialogComponent {
  account: Account;
  accountType: string;

  constructor(
    public dialogRef: MdDialogRef<SelectAccountDialogComponent>,
    public state: AccountsStateService
  ) {}

  selectAccount(account: Account) {
    this.dialogRef.close(account);
  }
}
