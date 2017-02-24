import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Flow } from '../../models';
import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';
import { NewFlowDialogComponent } from './../../components/new-flow-dialog/new-flow-dialog.component';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsListComponent implements OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();

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

  deleteFlow(id: string) {
    this.state.deleteFlow(id);
  }

  openNewFlowDialog() {
    let dialogRef = this.dialog.open(NewFlowDialogComponent);
    dialogRef.afterClosed().subscribe(newFlow => {
      if (newFlow) {
        this.createFlow(newFlow);
      }
    });
  }
}
