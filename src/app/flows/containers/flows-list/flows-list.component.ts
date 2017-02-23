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

  createFlow(name: String = 'New test flow', description: String = 'Test flow description') {
    this.state.createFlow(name, description);
  }

  deleteFlow(id: String) {
    this.state.deleteFlow(id);
  }
}
