import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Flow } from '../../models';
import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';
import { NewFlowDialogComponent } from './../../components/new-flow-dialog/new-flow-dialog.component';
import { DeleteFlowDialogComponent } from './../../components/delete-flow-dialog/delete-flow-dialog.component';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsListComponent implements OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  dialogConfig: MdDialogConfig;

  constructor(
    public state: FlowsStateService,
    public router: Router,
    public dialog: MdDialog,
  ) {
    this.state.createdFlow$.takeUntil(this.ngOnDestroy$)
    .subscribe(
      this.onCreatedFlow.bind(this),
      (err) => console.log('error', err)
    );

    this.dialogConfig = new MdDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  createFlow(newFlow) {
    this.state.createFlow(newFlow);
  }

  onCreatedFlow(flow: Flow) {
    // Upon successful flow creation, redirect user to select a trigger service
    // for the first step
    let route = ['flows', flow.id];
    if (flow.steps.length) {
      route = route.concat(['steps', flow.steps[0].id, 'select-service']);
    }
    this.router.navigate(route);
  }

  openNewFlowDialog() {
    let config = new MdDialogConfig();
    config.width = '450px';
    let dialogRef = this.dialog.open(NewFlowDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(newFlow => {
      if (newFlow) {
        this.createFlow(newFlow);
      }
    });
  }

  openDeleteFlowDialog(id: string, name: string) {
    let dialogRef = this.dialog.open(DeleteFlowDialogComponent, this.dialogConfig);
    dialogRef.componentInstance.name = name;
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.state.deleteFlow(id);
      }
    });
  }
}
