import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Account } from './../../models';
import { AccountsStateService } from './../../services';

@Component({
  selector: 'delete-account-dialog',
  templateUrl: 'delete-account-dialog.component.html',
  styleUrls: ['delete-account-dialog.component.css']
})
export class DeleteAccountDialogComponent {
  account: Account;

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    public state: AccountsStateService
  ) {}
}
