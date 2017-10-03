import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// GraphQL queries & mutations
import { getTasksQuery } from './task.gql';

@Injectable()
export class TasksApiService {
  constructor(
    private apollo: Apollo,
    private http: Http
  ) {}

  public getTasks(): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: getTasksQuery
    });
  }
}
