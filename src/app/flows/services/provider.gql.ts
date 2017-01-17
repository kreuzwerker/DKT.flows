import gql from 'graphql-tag';

export const providersQuery = gql`
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
`