import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TaskState } from './../models';

// GraphQL queries & mutations
import { getTasksQuery, updateTaskMutation } from './task.gql';

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

  public updateTaskState(
    {id, state}: {
      id: string,
      state: TaskState,
    }
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: updateTaskMutation,
      variables: {
        id: id,
        state: state
      }
    }).map(({data}) => data.updateTask);
  }
}
