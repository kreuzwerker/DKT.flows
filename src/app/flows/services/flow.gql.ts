import gql from 'graphql-tag';

export const getFlowsQuery = gql`
  query FlowsQuery {
    allFlows {
      id
      name
      description
    }
  }
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
    service {
      id,
      type,
      name,
      description
      provider {
        id,
        name,
        icon
      }
    }
  }
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

export const updateStepMutation = gql`
  mutation StepMutation(
    $id: ID!,
    $position: Int!,
    $service: ID!,
  ) {
    updateStep(
      id: $id,
      position: $position,
      service: $service
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
