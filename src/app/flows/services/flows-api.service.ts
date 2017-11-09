import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { ApolloQueryResult } from 'apollo-client';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Http, Request, RequestMethod, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_FLOWS_URL, API_PROVIDERS_URL } from './../constants';
import { Flow, Step, StepConfigParamsInput, FlowData, StepData, Provider } from './../models';
import { UUID } from 'angular2-uuid';
import { cloneDeep, sortBy } from 'lodash';

// GraphQL queries & mutations
import * as gql from './flow.gql';

@Injectable()
export class FlowsApiService {
  constructor(
    private apollo: Apollo,
    private http: Http
  ) {}

  public getFlow({id}: {id: string | Observable<string>}): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: gql.getFlowQuery,
      variables: {
        id: id
      },
      reducer: (previousResult, action) => {
        return previousResult['Flow']
          ? this.reduceGetFlow(previousResult)
          : previousResult;
      },
    });
  }

  public getFlowLogs(
    id: string, offset: number, limit: number, status: string
  ): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: gql.getFlowLogsQuery,
      variables: {
        id: id,
        offset: offset,
        limit: limit,
        status: status
      },
      // Always fetch an up-to-date list of tasks from the server
      fetchPolicy: 'network-only'
    });
  }

  public getFlows(): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: gql.getFlowsQuery,
      // Always fetch an up-to-date list of tasks from the server
      fetchPolicy: 'cache-and-network'
    });
  }

  public createFlow(flow): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: gql.createFlowMutation,
      variables: flow,
      optimisticResponse: this.optimisticallyAddFlow(flow),
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
      mutation: gql.deleteFlowMutation,
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

  public restoreFlow(
    {flowId}: {flowId: string}
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: gql.restoreFlowMutation,
      variables: {
        flowId: flowId,
      }
    }).map(({data}) => data.restoreFlow);
  }

  public getProviders({id}: {id: string | Observable<string>}): ApolloQueryObservable<any> {
    return this.apollo.watchQuery<any>({
      query: gql.getProvidersQuery,
      variables: {
        // NB fake var to hold back the query until we trigger it via this observable
        id: id
      }
    });
  }

  public updateStep(flowId: string, step: Step): Observable<ApolloQueryResult<any>> {
    const updatedStep = Object.assign({}, step, {
      flow: { id: flowId } as Flow
    });

    // NB mutation payload differs from Step model
    const updatedStepPayload = {
      id: step.id,
      position: step.position,
      service: step.service && step.service.id || null,
      configParams: step.configParams,
    };

    return this.apollo.mutate<any>({
      mutation: gql.updateStepMutation,
      variables: updatedStepPayload,
      optimisticResponse: this.optimisticallyUpdateStep(updatedStep),
    }).map(({data}) => data.updateStep);
  }

  public addFlowStep(flow: Flow, step: Step): Observable<ApolloQueryResult<any>> {
    const newStep = Object.assign({}, step, {
      flow: { id: flow.id } as Flow
    });

    // NB mutation payload differs from Step model
    const newStepPayload = Object.assign({}, newStep, {
      flow: flow.id,
      service: step.service ? step.service.id : null,
    });

    return this.apollo.mutate<any>({
      mutation: gql.addFlowStepMutation,
      variables: newStepPayload,
      optimisticResponse: this.optimisticallyAddStep(
        newStep,
        this.generateFlowStepsPositions(flow, step)
      ),
      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          const newState = this.pushNewFlowStep(previousResult, mutationResult.data.createStep);
          return this.updateFlowStepsPositions(newState, mutationResult.data.createStep.flow.steps);
        },
      },
    }).map(({data}) => data.createStep);
  }

  public removeFlowStep(flow: Flow, step: Step): Observable<ApolloQueryResult<any>> {
    const removedStep = Object.assign({}, step, {
      flow: { id: flow.id } as Flow
    });

    const flowWithoutRemovedStep = Object.assign({}, flow, {
      steps: flow.steps.filter(step => step.id !== removedStep.id)
    });

    return this.apollo.mutate<any>({
      mutation: gql.removeFlowStepMutation,
      variables: {
        stepId: step.id,
      },
      optimisticResponse: this.optimisticallyRemoveStep(
        removedStep,
        this.regenerateFlowStepsPositions(flowWithoutRemovedStep)
      ),
      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          const newState = this.removeDeletedFlowStep(
            previousResult, mutationResult.data.deleteStep
          );
          return this.updateFlowStepsPositions(newState, mutationResult.data.deleteStep.flow.steps);
        },
      },
    });
  }

  public testFlowStep(stepId: String, payload: String): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: gql.testFlowStepMutation,
      variables: {
        id: stepId,
        payload: payload,
      },
      updateQueries: {
        FlowQuery: (previousResult, { mutationResult }: any) => {
          return this.updateTestedFlowStep(previousResult, mutationResult.data.testStep);
        },
      },
    }).map(({data}) => {
      data.testStep.result = JSON.parse(data.testStep.result);
      return data.testStep;
    });
  }

  public createFlowRun(
    flowId: string,
    userId: string
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: gql.createFlowRunMutation,
      variables: {
        flowId: flowId,
        userId: userId
      },
    }).map(({data}) => data.createFlowRun);
  }

  public startFlowRun(
    flowRunId: string,
    payload: Object
  ): Observable<ApolloQueryResult<any>> {
    return this.apollo.mutate<any>({
      mutation: gql.startFlowRunMutation,
      variables: {
        flowRunId: flowRunId,
        payload: payload,
      },
    }).map(({data}) => data.startFlowRun);
  }

  /**
   * Helper functions
   */

  private reduceGetFlow(state) {
    if (state.Flow.steps.length === 0) {
      return state;
    }

    const newState = cloneDeep(state) as any;

    // Sort flow steps by position
    newState.Flow.steps = sortBy(newState.Flow.steps, 'position');
    return newState;
  }

  private optimisticallyUpdateStep(step: Step): any {
    return {
      __typename: 'Mutation',
      updateStep: Object.assign({}, step, {
        __typename: 'Step',
        configParams: step.configParams ? step.configParams.map(p => {
          return Object.assign({}, p, {
            __typename: 'StepConfigParams'
          });
        }) : step.configParams,
        flow: {
          __typename: 'Flow',
          id: step.flow.id,
          draft: true
        }
      })
    };
  }

  private optimisticallyAddFlow(flow: Flow): any {
    return {
      __typename: 'Mutation',
      createFlow: Object.assign({}, flow, {
        __typename: 'Flow',
      }),
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

  private optimisticallyAddStep(step: Step, updatedStepsPositions): any {
    return {
      __typename: 'Mutation',
      createStep: Object.assign({}, step, {
        __typename: 'Step',
        service: step.service || null,
        flow: {
          __typename: 'Flow',
          id: step.flow.id,
          draft: true,
          steps: updatedStepsPositions
        }
      })
    };
  }

  private generateFlowStepsPositions(flow: Flow, newStep: Step): Step[] {
    const steps = sortBy(flow.steps, 'position');
    let pos = newStep.position;
    return steps.map((step) => {
      // Move all steps that should come after the new step
      if (step.id !== newStep.id && step.position >= newStep.position) {
        pos++;
        return Object.assign({}, step, {
          position: pos
        });
      } else {
        return step;
      }
    });
  }

  private regenerateFlowStepsPositions(flow: Flow): Step[] {
    const steps = sortBy(flow.steps, 'position');
    let pos = -1;
    return steps.map((step) => {
      pos++;
      return Object.assign({}, step, {
        position: pos
      });
    });
  }

  private pushNewFlowStep(state, newStep): any {
    return {
      Flow: Object.assign({}, state.Flow, newStep.flow, {
        steps: [...state.Flow.steps, newStep]
      })
    };
  }

  private updateFlowStepsPositions(state, updatedSteps): any {
    let res = {
      Flow: Object.assign({}, state.Flow, {
        steps: state.Flow.steps.map((step) => {
          const s = updatedSteps.find(_step => _step.id === step.id);
          return Object.assign({}, step, {
            position: s ? s.position : step.position
          });
        })
      })
    };

    return res;
  }

  private optimisticallyRemoveStep(step: Step, updatedStepsPositions): any {
    return {
      __typename: 'Mutation',
      deleteStep: {
        __typename: 'Step',
        id: step.id,
        flow: {
          __typename: 'Flow',
          id: step.flow.id,
          draft: true,
          steps: updatedStepsPositions
        }
      },
    };
  }

  private removeDeletedFlowStep(state, deleteStep): any {
    return {
      Flow: Object.assign({}, state.Flow, deleteStep.flow, {
        steps: state.Flow.steps.filter((s) => s.id !== deleteStep.id)
      })
    };
  }

  private updateTestedFlowStep(state, stepTest): any {
    // Updates the 'tested' property of the tested step
    let steps = state.Flow.steps.map(step => {
      if (step.id === stepTest.id) {
        return Object.assign({}, step, {tested: stepTest.tested});
      }
      return step;
    });

    return {
      Flow: Object.assign({}, state.Flow, {
        steps: steps
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
