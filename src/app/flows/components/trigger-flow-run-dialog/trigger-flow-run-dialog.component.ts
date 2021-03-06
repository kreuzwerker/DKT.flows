import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'trigger-flow-run-dialog',
  templateUrl: 'trigger-flow-run-dialog.component.html',
  styleUrls: ['trigger-flow-run-dialog.component.css']
})
export class TriggerFlowRunDialogComponent {
  constructor(public dialogRef: MatDialogRef<TriggerFlowRunDialogComponent>) {}
}
