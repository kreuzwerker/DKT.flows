import { Subject } from 'rxjs/Subject';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Flow } from '../../models';
import { FlowsStateService } from './../../services';
import { FlowsListData } from './../../services/flow.gql';

@Component({
  selector: 'flows-list',
  templateUrl: 'flows-list.component.html',
  styleUrls: ['flows-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlowsListComponent {
  ngOnDestroy$ = new Subject<boolean>();

  constructor(
    public state: FlowsStateService,
    public router: Router,
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

  createFlow(name: string = 'New test flow', description: string = 'Test flow description') {
    this.state.createFlow(name, description);
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
}
