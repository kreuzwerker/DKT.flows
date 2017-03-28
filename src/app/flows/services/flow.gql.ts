import gql from 'graphql-tag';
import { serviceConfigSchemaFragment } from './provider.gql';

export const flowsItemFragment = gql`
  fragment FlowsItem on Flow {
    id
    name
    description
  }
`;

export const getFlowsQuery = gql`
  query FlowsQuery {
    allFlows {
      ...FlowsItem
    }
  }

  ${flowsItemFragment}
`;

export class FlowsListData {
  id: string;
  name: string;
  description: string;
}

export const flowStepFragment = gql`
  fragment FlowStep on Step {
    id,
    position,
    tested,
    configParams {
      fieldId,
      value
    },
    service {
      id,
      type,
      name,
      description,
      configSchema {
        ...ServiceConfigSchema
      },
      samplePayload,
      provider {
        id,
        name,
        icon
      }
    }
  }

  ${serviceConfigSchemaFragment}
`;

export const getFlowQuery = gql`
  query FlowQuery($id: ID) {
    Flow(id: $id) {
      id,
      name,
      description,
      steps {
        ...FlowStep
      }
    }
  }

  ${flowStepFragment}
`;

export const createFlowMutation = gql`
  mutation createFlow(
    $id: ID!
    $name: String!,
    $description: String!,
  ) {
    createFlow(
      id: $id,
      name: $name,
      description: $description,
    ) {
      ...FlowsItem
      steps {
        ...FlowStep
      }
    }
  }

  ${flowsItemFragment}
  ${flowStepFragment}
`;

export const deleteFlowMutation = gql`
  mutation deleteFlow($flowId:ID!) {
    deleteFlow(id: $flowId) {
      id
    }
  }
`;

export const updateStepMutation = gql`
  mutation StepMutation(
    $id: ID!,
    $position: Int!,
    $service: ID!,
    $configParams: [StepConfigParamsInput]
  ) {
    updateStep(
      id: $id,
      position: $position,
      service: $service,
      configParams: $configParams,
    ) {
      ...FlowStep
    }
  }

  ${flowStepFragment}
`;

export const addFlowStepMutation = gql`
  mutation createStep($flow: ID!, $position: Int!, $service: ID) {
		createStep(flow: $flow, position: $position, service: $service) {
      ...FlowStep
    }
  }

  ${flowStepFragment}
`;

export const removeFlowStepMutation = gql`
  mutation deleteStep($stepId:ID!) {
    deleteStep(id: $stepId) {
      ...FlowStep
    }
  }

  ${flowStepFragment}
`;

export const testFlowStepMutation = gql`
  mutation TestStep($id:ID!, $payload:String!) {
    testStep(id: $id, payload: $payload) {
      id
      description
      service {
        id
        name
        type
      }
      result
      error
      tested
    }
  }
`;

export const createAndStartFlowRunMutation = gql`
  mutation createAndStartFlowRun(
    $flowId: ID!,
    $userId: ID!,
    $payload: String!,
  ) {
    createAndStartFlowRun(
      flow: $flowId,
      userId: $userId,
      payload: $payload,
    ) {
      id
      status
      message
    }
  }
`;
