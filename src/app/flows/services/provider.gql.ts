import gql from 'graphql-tag';

export const serviceConfigSchemaFragment = gql`
  fragment ServiceConfigSchema on ServiceConfigSchema {
    id,
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
        type,
        configSchema {
          ...ServiceConfigSchema
        }
      }
    }
  }

  ${serviceConfigSchemaFragment}
`;
