import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { FlowState, StepState, ServicesState, getCurrentFlow, getCurrentStep, getServices, getCurrentService } from './reducers';
import { Flow, Step, Service, ServiceStep } from './models';
import { FlowActions, StepActions, ServicesActions } from './actions';

@Injectable()
export class FlowsStateService {
  // Current loaded flow
  flow$: Observable<Flow>;
  // Current editing step
  step$: Observable<Step>;
  // Available services
  services$: Observable<Service[]>;
  // Current service
  service$: Observable<Service>;

  constructor(
      private flowActions: FlowActions,
      private stepActions: StepActions,
      private servicesActions: ServicesActions,
      private store$: Store<AppState>
    ) {
    this.flow$     = store$.let(getCurrentFlow());
    this.step$     = store$.let(getCurrentStep());
    this.services$ = store$.let(getServices());
    this.service$  = store$.let(getCurrentService());
  }

  loadFlow(id: string): void {
    this.store$.dispatch(
      this.flowActions.loadFlow(id)
    );
  }

  loadServices(): void {
    /**
    - step
      - name
      - service
    - step ..
    */
    this.store$.dispatch(
      this.servicesActions.loadServices()
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

  selectService(service: Service): void {
    this.store$.dispatch(
      this.servicesActions.selectService(service)
    );    
  }
}
