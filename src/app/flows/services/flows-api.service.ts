import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Http, Request, RequestMethod, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_FLOWS_URL, API_PROVIDERS_URL } from './../constants';
import { Flow, Step, FlowData, StepData, Provider } from './../models';

// GraphQL queries & mutations
import { getFlowsQuery, FlowsListData, getFlowQuery, updateStepMutation, addFlowStepMutation, removeFlowStepMutation } from './flow.gql';
import { getProvidersQuery } from './provider.gql';

@Injectable()
export class FlowsApiService {
  constructor(
    private apollo: Angular2Apollo,
    private http: Http
  ) {}

  public getFlow({id}: {id: String | Observable<String>}): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: getFlowQuery,
      variables: {
        id: id
      }
    });
  }

  public getFlows(): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: getFlowsQuery
    });
  }

  public getProviders({id}: {id: String | Observable<String>}): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: getProvidersQuery,
      variables: {
        // NB fake var to hold back the query until we trigger it via this observable
        id: id
      }
    });
  }

  public updateStep(
    {id, position, serviceId}: {id: String, position: Number, serviceId: String}
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: updateStepMutation,
      variables: {
        id: id,
        position: position,
        serviceId: serviceId
      }
    }).map(({data}) => data.updateStep);
  }

  public addFlowStep(flowId: String, step: Step): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: addFlowStepMutation,
      variables: {
        flow: flowId,
        position: step.position,
        service: step.service ? step.service.id : null,
      },
      // ISSUE: do we need to know the id beforehand?
      // optimisticResponse: this.optimisticallyAddStep(step),

      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          return this.pushNewFlowStep(previousResult, mutationResult.data.createStep);
        },
      },
    }).map(({data}) => data.createStep);
  }

  public removeFlowStep(flowId: String, step: Step): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: removeFlowStepMutation,
      variables: {
        stepId: step.id,
      },
      optimisticResponse: this.optimisticallyRemoveStep(step),

      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          return this.removeDeletedFlowStep(previousResult, mutationResult.data.deleteStep);
        },
      },
    });
  }

  /**
   * Helper functions
   */

  private optimisticallyAddStep(step: Step): Object {
    return {
        __typename: 'Mutation',
        createStep: {
          __typename: 'Step',
          id: 'new-' + (+new Date),
          position: step.position,
          createdAt: +new Date,
          service: step.service,
        },
      }
  }

  private pushNewFlowStep(state, newStep): Object {
    const prevSteps = state.Flow.steps;
    return {
      Flow: Object.assign({}, state.Flow, {
        steps: [...prevSteps, newStep]
      })
    };
  }

  private optimisticallyRemoveStep(step: Step): Object {
    return {
        __typename: 'Mutation',
        deleteStep: {
          __typename: 'Step',
          id: step.id,
          position: step.position,
          service: step.service,
        },
      }
  }

  private removeDeletedFlowStep(state, deleteStep): Object {
    return {
      Flow: Object.assign({}, state.Flow, {
        steps: state.Flow.steps.filter((s) => s.id != deleteStep.id)
      })
    };
  }

  /**
   * Legacy REST MockAPI
   */

  fetchFlow(flowId: number): Observable<FlowData> {
    return this.get(`${API_FLOWS_URL}/${flowId}`);
  }

  updateFlow(flowId: number, data: FlowData): Observable<FlowData> {
    return this.patch(`${API_FLOWS_URL}/${flowId}`, data);
  }

  updateFlowStep(flowId: number, stepId: number, data: StepData): Observable<StepData> {
    console.log('PATCH step data', data);
    return this.patch(`${API_FLOWS_URL}/${flowId}/steps/${stepId}`, data);
  }

  fetchProviders(): Observable<Provider[]> {
    return this.get(`${API_PROVIDERS_URL}`);
  }

  private get(url: string): Observable<any> {
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  private post(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private put(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private patch(url: string, data: any): Observable<any> {
    return this.http.patch(url, data, this.createOptions())
      .map((res: Response) => res.json());
  }

  private createOptions(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }
}
