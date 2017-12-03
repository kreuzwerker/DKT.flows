import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Account } from './../../models';
import { AccountsStateService } from './../../services';
import { omit } from 'lodash';

@Component({
  selector: 'dkt-account-dialog',
  templateUrl: 'account-dialog.component.html',
  styleUrls: ['account-dialog.component.css']
})
export class AccountDialogComponent {
  account: Account = null;
  requiredAccountType: string = null;
  selectedAccount: Account = null;

  accounts: Account[] = [];

  constructor(
    public dialogRef: MdDialogRef<AccountDialogComponent>,
    public state: AccountsStateService
  ) {
    this.state.accounts$.subscribe(accounts => {
      this.accounts = accounts.data;
    });
  }

  submitForm(form) {
    if (form.valid) {
      this.dialogRef.close({
        account: Object.assign({}, this.account, {
          name: form.value.name
        }),
        credentials: omit(form.value, 'name')
      });
    }
  }

  isSelectMode() {
    return this.requiredAccountType !== null;
  }

  getTitle() {
    if (this.isSelectMode()) {
      const name = this.state.getAccountTypeName(this.requiredAccountType);
      return `Select ${name} account`;
    } else {
      const name = this.state.getAccountTypeName(this.account.accountType);
      const action = this.account.id ? 'Edit' : 'Connect';
      return `${action} ${name} account ${this.account.name}`;
    }
  }
}
