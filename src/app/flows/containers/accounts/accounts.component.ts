import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
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
    public flowsApp: FlowsAppService,
    public state: AccountsStateService,
    public dialog: MdDialog
  ) {
    this.dialogConfig = new MdDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnInit() {
    this.state.loadAccounts();
  }

  updateAccount(account: Account) {
    this.state.updateAccount(account).subscribe(account => {
      this.flowsApp.hideStatusMessage();
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
        this.flowsApp.showStatusMessage(
          `Updating account "${account.name}"...`,
          'loading'
        );
        this.updateAccount(account);
      }
    });
  }
}
