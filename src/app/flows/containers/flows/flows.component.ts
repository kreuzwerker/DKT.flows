import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Flow } from '../../models';
import { FlowsAppService, FlowsStateService } from './../../services';
import { NewFlowDialogComponent } from './../../components/new-flow-dialog/new-flow-dialog.component';

@Component({
  selector: 'dkt-flows',
  templateUrl: 'flows.component.html',
  styleUrls: ['flows.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FlowsComponent implements OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  dialogConfig: MatDialogConfig;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {
    this.state.createdFlow$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onCreatedFlow.bind(this), err => {
        this.showInfoMessage(`An error occured. Could not create the flow.`);
      });

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  createFlow(flowData) {
    this.state.createFlow(this.flowsApp.createFlowObject(flowData));
  }

  onCreatedFlow(flow: Flow) {
    this.flowsApp.hideStatusMessage();
    this.showInfoMessage(`Created new flow "${flow.name}".`);

    // Upon successful flow creation, redirect user to select a trigger service
    // for the first step
    let route = ['flows', flow.id];
    if (flow.steps.length) {
      route = route.concat(['steps', flow.steps[0].id, 'select-service']);
    }
    this.router.navigate(route);
  }

  openNewFlowDialog() {
    let config = new MatDialogConfig();
    config.width = '450px';
    let dialogRef = this.dialog.open(NewFlowDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(newFlow => {
      if (newFlow) {
        // DEBUG why status message isn't showing
        this.createFlow(newFlow);
        this.flowsApp.showStatusMessage(
          `Creating flow "${newFlow.name}"...`,
          'loading'
        );
      }
    });
  }

  showInfoMessage(message: string) {
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }
}
