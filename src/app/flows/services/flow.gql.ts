import gql from 'graphql-tag';

export const getFlows = gql`
  query FlowsQuery {
    allFlows {
      id
      name
      description
    }
  }
`;

export const getFlow = gql`
  query FlowQuery($id: ID) {
    Flow(id: $id) {
      id,
      name,
      description,
      steps {
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
    }
  }
`;

export const updateStep = gql`
  mutation StepMutation(
    $id: ID!,
    $position: Int!,
    $serviceId: ID!,
  ) {
    updateStep(
      id: $id,
      position: $position,
      serviceId: $serviceId
    ) {
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
  }
`;
