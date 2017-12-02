import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import * as lodash from 'lodash';

import { ApolloQueryResult } from 'apollo-client';
import { ApolloQueryObservable } from 'apollo-angular';
import { NgRedux, select } from '@angular-redux/store';
import { AppState } from './../../reducers';
import { BaseStateService } from './../../core/services';
import { AccountsApiService } from './../services';
import { Account } from './../models';
import { FlowsAppActions } from './../states';

@Injectable()
export class AccountsStateService extends BaseStateService {
  storeKey = 'flowsApp';

  accountTypes = [{ accountType: 'AWS', name: 'AWS', icon: 'donut_large' }];

  //
  // App data state
  //

  // All accounts list
  accounts$: Observable<ApolloQueryResult<Account>>;

  constructor(
    private api: AccountsApiService,
    public store: NgRedux<AppState>,
    public actions: FlowsAppActions
  ) {
    super(store);
  }

  getAccountType(type: string): Account {
    return this.accountTypes.find(
      accountType => accountType.accountType === type
    );
  }

  getAccountTypeIcon(type: string): string {
    switch (type) {
      case 'aws':
        return 'donut_large';

      case 'twitter':
        return 'donut_small';

      default:
        return 'donut_large';
    }
  }

  getAccountTypeName(accountType: string) {
    return this.getAccountType(accountType).name;
  }

  //
  // API
  //

  loadAccounts(filterByAccountType: string = null) {
    // Fetch an up-to-date list of flows
    this.dispatch(this.actions.setLoadingAccounts(true));
    this.accounts$ = this.api.getAccounts().map(response => {
      // Flatten the data object to array of flows
      let data =
        response.data && response.data.allAccounts
          ? response.data.allAccounts
          : [];

      if (data && filterByAccountType) {
        data = data.filter(account => account.accountType === filterByAccountType);
      }

      // Return the full response including the loading flag
      return Object.assign({}, response, { data: data });
    });

    this.accounts$.subscribe(
      accounts => {
        this.dispatch(this.actions.setLoadingAccounts(false));
      },
      err => {
        this.dispatch(this.actions.setLoadingAccounts(false));
        console.log(err);
      }
    );
  }

  createAccount(account): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingAccount(true, false));
    this.api.createAccount(account).subscribe(
      account => {
        this.dispatch(this.actions.setSavingAccount(false, true));
        obs$.next(account);
      },
      err => {
        this.dispatch(this.actions.setSavingAccount(false, true));
      }
    );
    return obs$;
  }

  updateAccount(account: Account): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingAccount(true, false));
    this.api.updateAccount(account).subscribe(
      _account => {
        this.dispatch(this.actions.setSavingAccount(false, true));
        obs$.next(account);
      },
      err => {
        this.dispatch(this.actions.setSavingAccount(false, true));
      }
    );
    return obs$;
  }

  deleteAccount(account: Account): Observable<any> {
    let obs$ = new Subject<any>();
    this.dispatch(this.actions.setSavingAccount(true, false));
    this.api.deleteAccount(account.id).subscribe(
      _account => {
        this.dispatch(this.actions.setSavingAccount(false, true));
        obs$.next(account);
      },
      err => {
        this.dispatch(this.actions.setSavingAccount(false, true));
      }
    );
    return obs$;
  }
}
