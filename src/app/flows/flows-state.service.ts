import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { getCurrentFlow, getCurrentStep } from './reducers';
import { Flow, Step } from './models';
import { FlowActions } from './actions';

@Injectable()
export class FlowsStateService {
  // Current loaded flow
  flow$: Observable<Flow>;
  // Current editing step
  step$: Observable<Step>

  constructor(private actions: FlowActions, private store$: Store<AppState>) {
    this.flow$ = store$.let(getCurrentFlow());
    this.step$ = store$.let(getCurrentStep());
  }

  loadFlow(id: string): void {
    this.store$.dispatch(
      this.actions.loadFlow(id)
    );
  }
}
