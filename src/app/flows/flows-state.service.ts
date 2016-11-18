import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { FlowState, StepState, ServicesState, getCurrentFlow, getCurrentStep, getServices } from './reducers';
import { Flow, Step, Service, ServiceStep } from './models';
import { FlowActions, StepActions, ServicesActions } from './actions';

@Injectable()
export class FlowsStateService {
  // Current loaded flow
  flow$: Observable<Flow>;
  // Current editing step
  step$: Observable<Step>
  // Available services
  services$: Observable<Service[]>

  constructor(
      private flowActions: FlowActions,
      private stepActions: StepActions,
      private servicesActions: ServicesActions,
      private store$: Store<AppState>
    ) {
    this.flow$     = store$.let(getCurrentFlow());
    this.step$     = store$.let(getCurrentStep());
    this.services$ = store$.let(getServices())
  }

  loadFlow(id: string): void {
    this.store$.dispatch(
      this.flowActions.loadFlow(id)
    );
  }

  loadServices(): void {
    // TODO implement effect
    let services = [
      { name: 'RSS', group: 'DKT native app', description: 'RSS service steps.', 'icon': 'rss_feed',
        steps: [
          { id: '1', name: 'New item in RSS feed', description: 'Triggers on new RSS feed items.', type: 'trigger' },
          { id: '2', name: 'New kitten in feed', description: 'Triggers on new RSS feed items which feature a kitten.', type: 'trigger' },

          { id: '3', name: 'Make coffee', description: 'Makes a delicious freshly brewed organic coffee.', type: 'action' },
          { id: '4', name: 'Sing hallelujah', description: 'Praises the lord.', type: 'action' },
        ],
      },
      { name: 'Email', group: 'DKT native app', description: 'Email service steps.', 'icon': 'mail'},
      { name: 'Filter', group: 'DKT native app', description: 'Filter service steps.', 'icon': 'filter_list'},
    ]

    this.store$.dispatch(
      this.servicesActions.loadServices(services)
    );
  }

  selectStep(step: Step): void {
    this.store$.dispatch(
      this.stepActions.selectStep(step)
    );
  }

  setStepServiceStep(service: Service, serviceStep: ServiceStep): void {
    this.store$.dispatch(
      this.stepActions.setStepServiceStep(service, serviceStep)
    );
  }
}
