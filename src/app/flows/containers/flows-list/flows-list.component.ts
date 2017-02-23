import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsListComponent {
  constructor(
    public state: FlowsStateService,
  ) {
  }

  createFlow(name: string = 'New test flow', description: string = 'Test flow description') {
    this.state.createFlow(name, description);

    // Upon successful creation, redirect to /flows/ID/steps/ID/select-service
    // -> subscribe to state.createdFlow$ -> onCreatedFlow -> redirect

  }

  deleteFlow(id: string) {
    this.state.deleteFlow(id);
  }
}
