import gql from 'graphql-tag';

export const flowQuery = gql`
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
`