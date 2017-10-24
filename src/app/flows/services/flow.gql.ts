import gql from 'graphql-tag';

export const flowsItemFragment = gql`
  fragment FlowsItem on Flow {
    id
    name
    description
    draft
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

  ${serviceConfigSchemaFragment}
`;

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
      }
    }
  }
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
        task
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
