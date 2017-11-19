import gql from 'graphql-tag';

/**
 * Fragments
 */

/**
 * Queries
 */

export const getApiInfo = gql`
  query AboutQuery {
    about {
      branch
      hash
      message
    }
  }
`;

/**
 * Mutations
 */
