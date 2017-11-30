import gql from 'graphql-tag';

/**
 * Fragments
 */

/**
 * Queries
 */

export const getAccountsQuery = gql`
  query AccountsQuery($id: ID) {
    Account(id: $id) {
      id,
      name,
    }
  }
`;

/**
 * Mutations
 */

export const createAccountMutation = gql`
  mutation createAccount(
    $name: String!,
  ) {
    createAccount(
      name: $name,
    ) {
      name
    }
  }
`;

export const updateAccountMutation = gql`
  mutation updateAccount(
    $name: String!
  ) {
    updateAccount(
      name: $name
    ) {
      name
    }
  }
`;
