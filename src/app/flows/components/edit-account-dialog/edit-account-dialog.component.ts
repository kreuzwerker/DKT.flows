import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Account } from './../../models';
import { AccountsStateService } from './../../services';
import { omit } from 'lodash';

@Component({
  selector: 'edit-account-dialog',
  templateUrl: 'edit-account-dialog.component.html',
  styleUrls: ['edit-account-dialog.component.css']
})
export class EditAccountDialogComponent {
  account: Account;

  constructor(
    public dialogRef: MdDialogRef<EditAccountDialogComponent>,
    public state: AccountsStateService
  ) {}

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
}
