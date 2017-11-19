import { Injectable } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';

@Injectable()
export class BaseStateService {
  storeKey: string;

  constructor(
    public store: NgRedux<AppState>
  ) {}

  //
  // UI State
  //

  // Get a UI state property observable
  select(key: string) {
    return this.store
      .select(this.storeKey)
      .map(state => state[key])
      .distinctUntilChanged();
  }

  // Get a current UI state property value
  get(key: string) {
    // @see http://stackoverflow.com/questions/35633684/how-to-get-current-value-of-state-object-with-ngrx-store
    let value;
    this.store
      .select(this.storeKey)
      .map(state => state[key])
      .take(1)
      .subscribe(s => (value = s));

    return value;
  }

  //
  // API
  //

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
