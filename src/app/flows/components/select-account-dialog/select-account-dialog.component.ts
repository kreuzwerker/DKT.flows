import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  requiredAccountType: string;
  selectedAccount: Account;

  constructor(
    public dialogRef: MdDialogRef<SelectAccountDialogComponent>,
    public state: AccountsStateService,
    public router: Router
  ) {}

  selectAccount(account: Account) {
    this.dialogRef.close(account);
  }

  goToAccounts() {
    this.dialogRef.close();
    this.router.navigate(['/flows/accounts']);
  }
}
