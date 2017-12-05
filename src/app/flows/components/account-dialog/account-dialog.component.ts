import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
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
  addNew: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AccountDialogComponent>,
    public state: AccountsStateService
  ) {
    this.state.accounts$.subscribe(accounts => {
      this.accounts = accounts.data;
    });
  }

  selectAccount(account: Account) {
    this.dialogRef.close(account);
  }

  submitForm(form) {
    if (form.valid) {
      const account = Object.assign({}, this.account, {
          name: form.value.name
        }),
        credentials = omit(form.value, 'name');

      if (this.isSelectMode()) {
        this.createAccount(account, credentials);
      } else {
        this.dialogRef.close({
          account: account,
          credentials: credentials
        });
      }
    }
  }

  createAccount(account: Account, credentials: object) {
    this.state
      .createAccount({
        name: account.name,
        accountType: account.accountType,
        credentials: JSON.stringify(credentials)
      })
      .subscribe(account => {
        // Reload accounts
        this.state.loadAccounts();
        this.addNew = false;
      });
  }

  isSelectMode() {
    return this.requiredAccountType !== null;
  }

  showCreate() {
    return (
      this.addNew ||
      !this.isSelectMode() ||
      (!this.state.get('loadingAccounts') && !this.accounts.length)
    );
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
