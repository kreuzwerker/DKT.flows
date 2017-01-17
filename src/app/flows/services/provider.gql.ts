import gql from 'graphql-tag';

export const getProviders = gql`
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
