/* tslint:disable: ter-max-len */
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs';
import { sortBy } from 'lodash';

import { FlowsAppService, FlowsStateService } from './../../services';
import { Flow, Run } from './../../models';

@Component({
  selector: 'flow-logs',
  templateUrl: 'flow-logs.component.html',
  styleUrls: ['flow-logs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowLogsComponent implements OnInit, OnDestroy {
  ngOnDestroy$ = new Subject<boolean>();
  flowId: string;
  flowLogsSub$: Subscription;

  runs: Run[] = null;

  constructor(
    private cd: ChangeDetectorRef,
    public flowsApp: FlowsAppService,
    public state: FlowsStateService,
  ) { }

  ngOnInit() {
    // Register current step preparation stage
    this.flowsApp.setStepStage(null);

    this.flowLogsSub$ = this.state.flowLogs$.subscribe(
      this.onLoadFlowLogs.bind(this),
      (err) => console.log('error', err)
    );

    this.state.select('flowId').takeUntil(this.ngOnDestroy$).subscribe(
      this.onRequestFlow.bind(this),
      (err) => console.log('error', err)
    );
  }

  onRequestFlow(flowId: string) {
    if (flowId) {
      this.state.loadFlowLogs(flowId);
    }
    this.flowId = flowId;
    this.cd.markForCheck();
  }

  onLoadFlowLogs(flow) {
    // Get flat list of runs from all flowRuns
    this.runs = flow.flowRuns.reduce((runs, flowRun) => {
      if (flowRun.runs) {
        flowRun.runs.forEach( run => {
          runs.push(run);
        });
      }
      return runs;
    }, []);

    this.runs = sortBy(this.runs, 'startedAt').reverse();
    this.cd.markForCheck();
  }

  reloadLogs() {
    this.state.loadFlowLogs(this.flowId);
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
    this.flowLogsSub$.unsubscribe();
  }
}
