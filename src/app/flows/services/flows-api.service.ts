import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Angular2Apollo, ApolloQueryObservable } from 'angular2-apollo';
import { Http, Request, RequestMethod, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_FLOWS_URL, API_PROVIDERS_URL } from './../constants';
import { Flow, Step, FlowData, StepData, Provider } from './../models';
import { UUID } from 'angular2-uuid';

// GraphQL queries & mutations
import { getFlowsQuery, FlowsListData, getFlowQuery, createFlowMutation, deleteFlowMutation, updateStepMutation, addFlowStepMutation, removeFlowStepMutation, createFlowRunMutation } from './flow.gql';
import { getProvidersQuery } from './provider.gql';

@Injectable()
export class FlowsApiService {
  constructor(
    private apollo: Angular2Apollo,
    private http: Http
  ) {}

  public getFlow({id}: {id: string | Observable<string>}): ApolloQueryObservable<any> {
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

  public createFlow(
    {name, description}: {name: string, description: string}
  ): Observable<ApolloQueryResult<any>> {
    let newFlow = {
      // Pre-generate id on client so we can perform optimistic updates
      id: UUID.UUID(),
      name: name,
      description: description
    };

    return this.apollo.mutate<any>({
      mutation: createFlowMutation,
      variables: newFlow,
      optimisticResponse: this.optimisticallyAddFlow(newFlow),
      updateQueries: {
        FlowsQuery: (previousResult, { mutationResult }: any) => {
          return this.pushNewFlow(previousResult, mutationResult.data.createFlow);
        },
      },

    }).map(({data}) => data.createFlow);
  }

  public deleteFlow(
    {flowId}: {flowId: string}
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: deleteFlowMutation,
      variables: {
        flowId: flowId,
      },
      optimisticResponse: this.optimisticallyRemoveFlow(flowId),
      updateQueries: {
        FlowsQuery: (previousResult, { mutationResult }: any) => {
          return this.removeDeletedFlow(previousResult, mutationResult.data.deleteFlow);
        },
      },

    }).map(({data}) => data.createFlow);
  }

  public getProviders({id}: {id: string | Observable<string>}): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: getProvidersQuery,
      variables: {
        // NB fake var to hold back the query until we trigger it via this observable
        id: id
      }
    });
  }

  public updateStep(
    {id, position, serviceId}: {id: string, position: Number, serviceId: string}
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: updateStepMutation,
      variables: {
        id: id,
        position: position,
        service: serviceId
      }
    }).map(({data}) => data.updateStep);
  }

  public addFlowStep(flowId: string, step: Step): Observable<ApolloQueryResult<any>> {
    let newStep = {
      id: step.id || UUID.UUID(),
      position: step.position,
      service: step.service,
    };

    return this.apollo.mutate<any>({
      mutation: addFlowStepMutation,
      variables: Object.assign({}, newStep, {
        flow: flowId,
        service: step.service ? step.service.id : null,
      }),
      optimisticResponse: this.optimisticallyAddStep(newStep),
      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          return this.pushNewFlowStep(previousResult, mutationResult.data.createStep);
        },
      },
    }).map(({data}) => data.createStep);
  }

  public removeFlowStep(flowId: string, step: Step): Observable<ApolloQueryResult<any>> {
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

  public createFlowRun(
    flowId: string,
    userId: string,
    payload: Object
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: createFlowRunMutation,
      variables: {
        flowId: flowId,
        userId: userId,
      },
    }).map(({data}) => data.createFlowRun);
  }

  /**
   * Helper functions
   */

  private optimisticallyAddFlow(flow: Flow): any {
    return {
        __typename: 'Mutation',
        createFlow: {
          __typename: 'Flow',
          id: flow.id,
          name: flow.name,
          description: flow.description,
        },
      };
  }

  private pushNewFlow(state, newFlow): any {
    return {
      allFlows: [...state.allFlows, newFlow]
    };
  }

  private optimisticallyRemoveFlow(flowId: string): any {
    return {
        __typename: 'Mutation',
        deleteFlow: {
          __typename: 'Flow',
          id: flowId,
        },
      };
  }

  private removeDeletedFlow(state, deleteFlow): any {
    return {
      allFlows: state.allFlows.filter((f) => f.id !== deleteFlow.id)
    };
  }

  private optimisticallyAddStep(step: Step): any {
    return {
        __typename: 'Mutation',
        createStep: {
          __typename: 'Step',
          id: step.id,
          position: step.position,
          createdAt: +new Date,
          service: step.service ? step.service : null,
        },
      };
  }

  private pushNewFlowStep(state, newStep): any {
    const prevSteps = state.Flow.steps;
    return {
      Flow: Object.assign({}, state.Flow, {
        steps: [...prevSteps, newStep]
      })
    };
  }

  private optimisticallyRemoveStep(step: Step): any {
    return {
        __typename: 'Mutation',
        deleteStep: {
          __typename: 'Step',
          id: step.id,
          position: step.position,
          service: step.service,
        },
      };
  }

  private removeDeletedFlowStep(state, deleteStep): any {
    return {
      Flow: Object.assign({}, state.Flow, {
        steps: state.Flow.steps.filter((s) => s.id !== deleteStep.id)
      })
    };
  }

  /**
   * Legacy REST MockAPI
   */

  // fetchFlow(flowId: number): Observable<FlowData> {
  //   return this.get(`${API_FLOWS_URL}/${flowId}`);
  // }

  // updateFlow(flowId: number, data: FlowData): Observable<FlowData> {
  //   return this.patch(`${API_FLOWS_URL}/${flowId}`, data);
  // }

  // updateFlowStep(flowId: number, stepId: number, data: StepData): Observable<StepData> {
  //   console.log('PATCH step data', data);
  //   return this.patch(`${API_FLOWS_URL}/${flowId}/steps/${stepId}`, data);
  // }

  // fetchProviders(): Observable<Provider[]> {
  //   return this.get(`${API_PROVIDERS_URL}`);
  // }

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
