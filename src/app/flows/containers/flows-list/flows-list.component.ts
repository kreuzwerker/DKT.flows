import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsListComponent implements OnDestroy  {
  ngOnDestroy$ = new Subject<boolean>();
  flows: FlowsListData[];

  constructor(
    private cd: ChangeDetectorRef,
    public state: FlowsStateService,
  ) {
    this.state.flows$.subscribe((flows) => {
      this.flows = flows;
      this.cd.markForCheck()
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
