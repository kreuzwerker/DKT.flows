import gql from 'graphql-tag';

/**
 * Fragments
 */

export const accountFragment = gql`
  fragment Account on Account {
    id
    key
    name
    accountType
  }
`;

/**
 * Queries
 */

export const getAccountsQuery = gql`
  query AccountsQuery {
    allAccounts {
      ...Account
    }
  }

  ${accountFragment}
`;

export const getAccountQuery = gql`
  query AccountQuery($id: ID) {
    Account(id: $id) {
      ...Account
    }
  }

  ${accountFragment}
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
      ...Account
    }
  }

  ${accountFragment}
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
      ...Account
    }
  }

  ${accountFragment}
`;

export const deleteAccountMutation = gql`
  mutation DeleteAccount($id: ID!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;
