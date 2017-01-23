import gql from 'graphql-tag';

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
