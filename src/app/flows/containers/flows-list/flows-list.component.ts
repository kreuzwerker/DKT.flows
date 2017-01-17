import { Subject } from 'rxjs/Subject';
import { Component, OnDestroy } from '@angular/core';

import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css']
})
export class FlowsListComponent implements OnDestroy  {
  ngOnDestroy$ = new Subject<boolean>();
  flows: FlowsListData[];

  constructor(
    public state: FlowsStateService
  ) {
    this.state.flows$.subscribe((flows) => {
      this.flows = flows;
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
}
