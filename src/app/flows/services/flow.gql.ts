import gql from 'graphql-tag';

/**
 * Fragments
 */

export const flowsItemFragment = gql`
  fragment FlowsItem on Flow {
    id
    name
    description
    draft
    steps {
      service {
        provider {
          icon
        }
      }
    }
    lastFlowRun {
      id
      status
    }
  }
`;


export const serviceConfigSchemaFragment = gql`
  fragment ServiceConfigSchema on ServiceConfigSchema {
    fieldId,
    type,
    label,
    position,
    defaultValue,
    required,
    options {
      label,
      value,
    },
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
  draft: boolean;
}

export const stepConfigParamsFragment = gql`
  fragment StepConfigParams on StepConfigParams {
    fieldId,
    value
  }
`;

export const flowStepFragment = gql`
  fragment FlowStep on Step {
    id,
    position,
    tested,
    configParams {
     ...StepConfigParams
    },
    service {
      id,
      type,
      name,
      description,
      task,
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

  ${stepConfigParamsFragment}
  ${serviceConfigSchemaFragment}
`;

/**
 * Queries
 */

export const getFlowQuery = gql`
  query FlowQuery($id: ID) {
    Flow(id: $id) {
      id,
      name,
      description,
      draft,
      steps {
        ...FlowStep
      }
      lastFlowRun {
        id
      }
    }
  }

  ${flowStepFragment}
`;

export const getFlowLogsQuery = gql`
  query FlowQuery($id: ID, $offset: Int, $limit: Int, $status: String) {
    Flow(id: $id) {
      id,
      runs(offset: $offset, limit: $limit, status: $status) {
        id
        status
        currentStep {
          configParams {
            ...StepConfigParams
          }
          service {
            task
            configSchema {
              ...ServiceConfigSchema
            }
          }
        }
        logs {
          steps {
            id
            position
            status
            message
            timestamp
          }
        }
        result
        startedAt
        finishedAt
      }
      runsCount(status: $status)
    }
  }

  ${stepConfigParamsFragment}
  ${serviceConfigSchemaFragment}
`;

export const getProvidersQuery = gql`
query ProvidersQuery {
  allProviders {
    id,
    name,
    description,
    icon,
    services {
      id,
      name,
      description,
      type
    }
  }
}
`;

/**
 * Mutations
 */

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

export const restoreFlowMutation = gql`
  mutation restoreFlow($flowId:ID!) {
    restoreFlow(id: $flowId) {
      id,
      name,
      description,
      draft,
      steps {
        ...FlowStep
      }
      lastFlowRun {
        id
      }
    }
  }

  ${flowStepFragment}
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
      flow {
        id
        draft
      }
    }
  }

  ${flowStepFragment}
`;

export const addFlowStepMutation = gql`
  mutation createStep($id: ID!, $flow: ID!, $position: Int!, $service: ID) {
		createStep(id: $id, flow: $flow, position: $position, service: $service) {
      ...FlowStep
      flow {
        id
        draft
        steps {
          id
          position
        }
      }
    }
  }

  ${flowStepFragment}
`;

export const removeFlowStepMutation = gql`
  mutation deleteStep($stepId:ID!) {
    deleteStep(id: $stepId) {
      id
      flow {
        id
        draft
        steps {
          id
          position
        }
      }
    }
  }
`;

export const testFlowStepMutation = gql`
  mutation TestStep(
    $id:ID!,
    $payload:String!,
    $configParams: [StepConfigParamsInput]
  ) {
    testStep(
      id: $id,
      payload: $payload,
      configParams: $configParams
    ) {
      id
      description
      service {
        id
        name
        type
        task
        outputType
      }
      result
      error
      tested
    }
  }
`;

export const createFlowRunMutation = gql`
  mutation createFlowRun(
    $flowId: ID!,
    $userId: ID!,
  ) {
    createFlowRun(
      flow: $flowId,
      userId: $userId,
    ) {
      id
      flow {
        id
        draft
        lastFlowRun {
          id
        }
      }
    }
  }
`;

export const startFlowRunMutation = gql`
  mutation startFlowRun(
    $flowRunId: ID!,
    $payload: String!,
  ) {
    startFlowRun(
      id: $flowRunId,
      payload: $payload,
    ) {
      id
      status
      message
      runsCount
    }
  }
`;
