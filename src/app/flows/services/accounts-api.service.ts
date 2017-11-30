import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Account } from './../models';
import { ACCOUNTS_DATA } from './../containers/accounts/accounts.data';

// GraphQL queries & mutations
import * as gql from './account.gql';

@Injectable()
export class AccountsApiService {
  constructor(private apollo: Apollo) {}

  // public getAccounts(): ApolloQueryObservable<any> {
  public getAccounts() {
    let obs$ = new Subject<any>();
    setTimeout(() => {
      obs$.next({
        data: {
          allAccounts: ACCOUNTS_DATA
        }
      });
    }, 1000);

    return obs$;

    // return this.apollo.watchQuery<any>({
    //   query: gql.getAccountsQuery
    // });
  }

  public createAccount(account): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate<any>({
        mutation: gql.createAccountMutation,
        variables: account,
        // optimisticResponse: this.optimisticallyAddAccount(account),
        // updateQueries: {
        //   AccountsQuery: (previousResult, { mutationResult }: any) => {
        //     return this.pushNewAccount(
        //       previousResult,
        //       mutationResult.data.createAccount
        //     );
        //   }
        // }
      })
      .map(({ data }) => data.createFlow);
  }

  public updateAccount(account: Account): Observable<ApolloQueryResult<any>> {
    let obs$ = new Subject<any>();
    setTimeout(() => {
      obs$.next({ data: { updateAccount: account } });
    }, 1000);

    return obs$;

    // return this.apollo
    //   .mutate<any>({
    //     mutation: gql.updateAccountMutation,
    //     variables: account
    //     // optimisticResponse: this.optimisticallyUpdateAccount(account)
    //   })
    //   .map(({ data }) => data.updateAccount);
  }
}
