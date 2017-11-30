import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { Account } from './../../models';

@Component({
  selector: 'edit-account-dialog',
  templateUrl: 'edit-account-dialog.component.html',
  styleUrls: ['edit-account-dialog.component.css']
})
export class EditAccountDialogComponent {
  account: Account;

  constructor(public dialogRef: MdDialogRef<EditAccountDialogComponent>) {}

  submitForm(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }
}
