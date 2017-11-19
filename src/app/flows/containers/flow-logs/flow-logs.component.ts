/* tslint:disable: ter-max-len */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { sortBy } from 'lodash';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, Run } from './../../models';

type LogStatus = 'all' | 'success' | 'running' | 'error';

@Component({
  selector: 'flow-logs',
  templateUrl: 'flow-logs.component.html',
  styleUrls: ['flow-logs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlowLogsComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowId: string;
  flowLogsSub$: Subscription;

  runs: Run[] = null;

  // State
  runsCount: number = 0;
  offset: number = 0;
  requestedOffset: number = 0;
  limit: number = 5;
  status: LogStatus;
  showDetails: Run = null;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public route: ActivatedRoute,
    public state: FlowsStateService
  ) {}

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage(null);

    // Both flowId and status params must be present
    Observable.combineLatest(
      this.state.select('flowId').takeUntil(this.ngOnDestroy$),
      this.route.params
        .takeUntil(this.ngOnDestroy$)
        .map(params => params['status']),
      (flowId, status) => ({ flowId: flowId, status: status })
    )
      .takeUntil(this.ngOnDestroy$)
      .subscribe(this.onRequestFlowLogs.bind(this), err =>
        console.log('error', err)
      );
  }

  onRequestFlowLogs({ flowId, status }: { flowId: string; status: LogStatus }) {
    if (flowId) {
      if (this.flowLogsSub$) {
        this.flowLogsSub$.unsubscribe();
      }

      this.state.loadFlowLogs(flowId, this.offset, this.limit, status);
      this.flowLogsSub$ = this.state.flowLogs$.subscribe(
        this.onLoadFlowLogs.bind(this),
        err => console.log('error', err)
      );
    }

    this.status = status;
    this.flowId = flowId;
    this.cd.markForCheck();
  }

  onLoadFlowLogs(flow) {
    this.runs = flow.runs;
    this.runsCount = flow.runsCount;
    this.offset = this.requestedOffset;
    this.cd.markForCheck();
  }

  reloadLogs() {
    this.fetchMoreLogs(this.offset);
  }

  fetchMoreLogs(offset: number) {
    // Wait with updating the current offset until the result set arrives.
    // Otherwise the state of the logs list and the pagination buttons don't
    // match.
    this.requestedOffset = offset;
    this.state.fetchMoreLogs(offset);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.flowLogsSub$.unsubscribe();
  }

  /*
    Helpers
   */

  getRunStatusType(run: Run): string {
    if (run.status === 'running') {
      return run.currentStep.service.task ? 'task' : 'running';
    } else {
      return run.status;
    }
  }

  getLastLogMsg(run: Run): string {
    const lastLog = run.logs.steps[run.logs.steps.length - 1];
    return lastLog && lastLog.message !== '' ? lastLog.message : '(none)';
  }

  toggleRunDetails(run: Run) {
    this.showDetails = run === this.showDetails ? null : run;
  }
}
