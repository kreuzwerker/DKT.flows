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
    return this.apollo.watchQuery<any>({
      query: gql.getAccountsQuery
    });
  }

  public createAccount(account): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate<any>({
        mutation: gql.createAccountMutation,
        variables: account,
        optimisticResponse: this.optimisticallyAddAccount(account),
        updateQueries: {
          AccountsQuery: (previousResult, { mutationResult }: any) => {
            return this.pushNewAccount(
              previousResult,
              mutationResult.data.createAccount
            );
          }
        }
      })
      .map(({ data }) => data.createAccount);
  }

  public updateAccount(account: Account): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate<any>({
        mutation: gql.updateAccountMutation,
        variables: account,
        optimisticResponse: this.optimisticallyUpdateAccount(account)
      })
      .map(({ data }) => data.updateAccount);
  }

  public deleteAccount(id: string): Observable<ApolloQueryResult<any>> {
    return this.apollo
      .mutate<any>({
        mutation: gql.deleteAccountMutation,
        variables: {
          id: id
        },
        optimisticResponse: this.optimisticallyRemoveAccount(id),
        updateQueries: {
          AccountsQuery: (previousResult, { mutationResult }: any) => {
            return this.removeDeletedAccount(
              previousResult,
              mutationResult.data.deleteAccount
            );
          }
        }
      })
      .map(({ data }) => data.deleteAccount);
  }

  private optimisticallyAddAccount(account: Account): any {
    return {
      __typename: 'Mutation',
      createAccount: Object.assign({}, account, {
        __typename: 'Account'
      })
    };
  }

  private pushNewAccount(state, newAccount): any {
    return { allAccounts: [...state.allAccounts, newAccount] };
  }

  private optimisticallyUpdateAccount(account: Account): any {
    return {
      __typename: 'Mutation',
      updateAccount: Object.assign({}, account, {
        __typename: 'Account'
      })
    };
  }

  private optimisticallyRemoveAccount(id: string): any {
    return {
      __typename: 'Mutation',
      deleteAccount: {
        __typename: 'Account',
        id: id
      }
    };
  }

  private removeDeletedAccount(state, deleteAccount): any {
    return {
      allAccounts: state.allAccounts.filter(a => a.id !== deleteAccount.id)
    };
  }
}
