import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  MdDialog,
  MdDialogConfig,
  MdSnackBar,
  MdSnackBarConfig
} from '@angular/material';
import { Account } from './../../models';
import { ACCOUNTS_DATA  } from './accounts.data';
import { FlowsAppService, AccountsStateService } from './../../services';
import { EditAccountDialogComponent } from './../../components/edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'dkt-accounts',
  templateUrl: 'accounts.component.html',
  styleUrls: ['accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent implements OnInit {
  dialogConfig: MdDialogConfig;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: AccountsStateService,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
    this.dialogConfig = new MdDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnInit() {
    this.state.loadAccounts();
  }

  createAccount(account: Account, credentials: object) {
    this.state
      .createAccount({
        name: account.name,
        accountType: account.accountType,
        credentials: JSON.stringify(credentials)
      })
      .subscribe(account => {
        this.showInfoMessage(`Connected account "${account.name}"`);
        this.cd.markForCheck();
      });
  }

  openNewAccountDialog(accountType: string) {
    let dialogRef = this.dialog.open(
      EditAccountDialogComponent,
      this.dialogConfig
    );
    dialogRef.componentInstance.account = {
      id: null,
      key: null,
      name: '',
      accountType: accountType
    };
    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.createAccount(payload.account, payload.credentials);
        this.cd.markForCheck();
      }
    });
  }

  updateAccount(account: Account) {
    this.state.updateAccount(account).subscribe(account => {
      this.showInfoMessage(`Updated account "${account.name}"`);
      this.cd.markForCheck();
    });
  }

  openEditAccountDialog(account: Account) {
    let dialogRef = this.dialog.open(
      EditAccountDialogComponent,
      this.dialogConfig
    );
    dialogRef.componentInstance.account = account;
    dialogRef.afterClosed().subscribe(account => {
      if (account) {
        this.updateAccount(account);
        this.cd.markForCheck();
      }
    });
  }

  deleteAccount(account: Account) {
    const name = account.name;
    this.state.deleteAccount(account).subscribe(account => {
      this.showInfoMessage(`Deleted account "${name}"`);
      this.cd.markForCheck();
    });
  }

  showInfoMessage(message: string) {
    let config = new MdSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }
}
