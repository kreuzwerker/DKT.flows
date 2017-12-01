import gql from 'graphql-tag';

/**
 * Fragments
 */

/**
 * Queries
 */

export const getAccountsQuery = gql`
  query AccountsQuery {
    allAccounts {
      id
      key
      name
      accountType
    }
  }
`;

export const getAccountQuery = gql`
  query AccountQuery($id: ID) {
    Account(id: $id) {
      id,
      key
      name,
      accountType,
    }
  }
`;

/**
 * Mutations
 */

export const createAccountMutation = gql`
  mutation CreateAccount(
    $name: String,
    $credentials: String,
    $accountType: String
  ) {
    createAccount(
      name: $name,
      credentials: $credentials,
      accountType: $accountType
    ) {
      id
      key
      name
      accountType
    }
  }
`;

export const updateAccountMutation = gql`
  mutation UpdateAccount(
    $id: ID!,
    $name: String,
    $credentials: String,
    $accountType: String
  ) {
    updateAccount(
      id: $id,
      name: $name,
      credentials: $credentials
      accountType: $accountType
    ) {
      id
      key
      name
      accountType
    }
  }
`;

export const deleteAccountMutation = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;
