import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import { Account } from './../../models';
import { FlowsAppService, AccountsStateService } from './../../services';
import { DeleteAccountDialogComponent } from './../../components/delete-account-dialog/delete-account-dialog.component';
import { AccountDialogComponent } from './../../components/account-dialog/account-dialog.component';

@Component({
  selector: 'dkt-accounts',
  templateUrl: 'accounts.component.html',
  styleUrls: ['accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent implements OnInit {
  dialogConfig: MatDialogConfig;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: AccountsStateService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.dialogConfig = new MatDialogConfig();
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
    let dialogRef = this.dialog.open(AccountDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.account = {
      id: null,
      key: null,
      name: '',
      accountType: accountType
    };
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.createAccount(payload.account, payload.credentials);
        this.cd.markForCheck();
      }
    });
  }

  updateAccount(account: Account, credentials: object) {
    this.state
      .updateAccount({
        id: account.id,
        name: account.name,
        accountType: account.accountType,
        credentials: JSON.stringify(credentials)
      })
      .subscribe(account => {
        this.showInfoMessage(`Updated account "${account.name}"`);
        this.cd.markForCheck();
      });
  }

  openEditAccountDialog(account: Account) {
    let dialogRef = this.dialog.open(AccountDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.account = account;
    dialogRef.afterClosed().subscribe(payload => {
      if (payload) {
        this.updateAccount(payload.account, payload.credentials);
        this.cd.markForCheck();
      }
    });
  }

  openDeleteAccountDialog(account: Account) {
    let dialogRef = this.dialog.open(
      DeleteAccountDialogComponent,
      this.dialogConfig
    );
    dialogRef.componentInstance.account = account;
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.state.deleteAccount(account);
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
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }
}
