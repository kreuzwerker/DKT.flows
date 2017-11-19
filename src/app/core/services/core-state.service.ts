import { Injectable } from '@angular/core';

import { NgRedux, select } from '@angular-redux/store';
import { AppState, Action } from './../../reducers';
import { BaseStateService } from './';
import { CoreApiService } from './';

@Injectable()
export class CoreStateService extends BaseStateService {
  storeKey: string;

  constructor(
    public api: CoreApiService,
    public store: NgRedux<AppState>
  ) {
    super(store);
  }

  getApiInfo() {
    return this.api
      .getApiInfo()
      .map(
        response =>
          response.data && response.data.about ? response.data.about : {}
      );
  }
}
