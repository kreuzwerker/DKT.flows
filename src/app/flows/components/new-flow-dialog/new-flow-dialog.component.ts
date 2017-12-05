import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'new-flow-dialog',
  templateUrl: 'new-flow-dialog.component.html',
  styleUrls: ['new-flow-dialog.component.css']
})
export class NewFlowDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewFlowDialogComponent>) {}

  submitForm(form) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }
}
