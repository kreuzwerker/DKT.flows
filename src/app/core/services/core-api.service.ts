import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';


// GraphQL queries & mutations
import * as gql from './core.gql';

@Injectable()
export class CoreApiService {
  constructor(private apollo: Apollo) {}

  // TODO move to Core module
  public getApiInfo(): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: gql.getApiInfo
    });
  }
}
