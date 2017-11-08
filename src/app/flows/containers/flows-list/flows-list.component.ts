import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Flow } from '../../models';
import * as flowHelpers from './../../utils/flow.helpers';
import { FlowsAppService, FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';
import { NewFlowDialogComponent } from './../../components/new-flow-dialog/new-flow-dialog.component';
import { DeleteFlowDialogComponent } from './../../components/delete-flow-dialog/delete-flow-dialog.component';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FlowsListComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  dialogConfig: MdDialogConfig;
  flowHelpers = flowHelpers;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    public router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
    this.state.createdFlow$
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onCreatedFlow.bind(this), err => {
        this.showInfoMessage(`An error occured. Could not create the flow.`);
      });

    this.dialogConfig = new MdDialogConfig();
    this.dialogConfig.width = '450px';
  }

  ngOnInit() {
    // Load flows data
    this.state.loadFlows();
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }

  reloadFlows() {
    this.state.loadFlows();
  }

  createFlow(flowData) {
    this.state.createFlow(this.flowsApp.createFlowObject(flowData));
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
        this.showInfoMessage(`Created flow "${newFlow.name}".`);
      }
    });
  }

  openDeleteFlowDialog(id: string, name: string) {
    let dialogRef = this.dialog.open(
      DeleteFlowDialogComponent,
      this.dialogConfig
    );
    dialogRef.componentInstance.name = name;
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.state.deleteFlow(id).subscribe(() => {
          this.showInfoMessage(`Deleted flow "${name}".`);
        }, (err) => {
          this.showInfoMessage(`An error occured. Could not delete the flow.`);
        });
      }
    });
  }

  showInfoMessage(message: string) {
    let config = new MdSnackBarConfig();
    config.duration = 2000;
    this.snackBar.open(message, 'OK', config);
  }

  /*
    Flow steps summary
  */

  getFirstStepIcon(flow: Flow): string {
    if (
      !flow.steps[0] ||
      !flow.steps[0].service ||
      !flow.steps[0].service.provider ||
      !flow.steps[0].service.provider.icon
    ) {
      return 'flash_on';
    }

    return flow.steps[0].service.provider.icon;
  }

  getLastStepIcon(flow: Flow): string {
    if (
      flow.steps.length <= 1 ||
      !flow.steps[flow.steps.length - 1] ||
      !flow.steps[flow.steps.length - 1].service ||
      !flow.steps[flow.steps.length - 1].service.provider ||
      !flow.steps[flow.steps.length - 1].service.provider.icon
    ) {
      return 'flash_on';
    }

    return flow.steps[flow.steps.length - 1].service.provider.icon;
  }
}
