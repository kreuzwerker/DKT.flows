import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'delete-flow-dialog',
  templateUrl: 'delete-flow-dialog.component.html',
  styleUrls: ['delete-flow-dialog.component.css']
})
export class DeleteFlowDialogComponent {
  @Input() name: string;
  constructor(public dialogRef: MatDialogRef<DeleteFlowDialogComponent>) {}
}
