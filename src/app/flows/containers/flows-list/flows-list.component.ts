import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { MdDialog, MdDialogConfig, MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Flow, FlowTriggerType } from '../../models';
import * as flowHelpers from './../../utils/flow.helpers';
import { FlowsAppService, FlowsStateService } from './../../services';
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
  flowTriggerType = FlowTriggerType;

  constructor(
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
    public router: Router,
    public dialog: MdDialog,
    public snackBar: MdSnackBar
  ) {
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

  openDeleteFlowDialog(id: string, name: string) {
    let dialogRef = this.dialog.open(
      DeleteFlowDialogComponent,
      this.dialogConfig
    );
    dialogRef.componentInstance.name = name;
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.state.deleteFlow(id).subscribe(
          () => {
            this.showInfoMessage(`Deleted flow "${name}".`);
          },
          err => {
            this.showInfoMessage(
              `An error occured. Could not delete the flow.`
            );
          }
        );
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
