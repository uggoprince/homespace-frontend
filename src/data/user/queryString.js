import gql from 'graphql-tag';

export const SIGNUP_USER_QUERY_STRING = gql`
mutation ($firstname: String!,
    $lastname: String!,
    $email: String!,
    $country: String!,
    $state: String!,
    $password: String!
    $address: String!) {
  signUp(firstname: $firstname,
      lastname: $lastname,
      email: $email,
      country: $country,
      state: $state,
      password: $password,
      address: $address) {
    user {
      id, country, state, lastname, firstname, profile { hasAgency }
    }
    token
  }
}
`;

export const LOGIN_USER_QUERY_STRING = gql`
mutation (
    $email: String!,
    $password: String!) {
  login(
      email: $email,
      password: $password) {
    user {
      id, country, state, firstname, lastname, profile { hasAgency }
    }
    token
  }
}
`;
