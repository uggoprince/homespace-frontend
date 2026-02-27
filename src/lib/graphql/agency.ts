import { gql } from '@apollo/client';

export const PROPERTY_PREVIEW_FIELDS = gql`
  fragment PropertyPreviewFields on Properties {
    id
    address
    propertyType
    title
    price
    intent
    units
    state
    country
    currency
    area
    bedRooms
    bathRooms
    status
    rentPaymentPeriod
    agency { name, address, username }
  }
`;

export const GET_AGENCY_PROPERTIES = gql`
  ${PROPERTY_PREVIEW_FIELDS}
  query ($agencyId: ID!, $offset: Int, $limit: Int) {
    getAgencyProperties(agencyId: $agencyId, offset: $offset, limit: $limit) {
      properties {
        ...PropertyPreviewFields
        photos { photo }
        propertyCode
      }
      count
    }
  }
`;

export const GET_AGENCY_PROPERTIES_WITH_DESCRIPTION = gql`
  ${PROPERTY_PREVIEW_FIELDS}
  query ($agencyId: ID!, $offset: Int, $limit: Int) {
    getAgencyProperties(agencyId: $agencyId, offset: $offset, limit: $limit) {
      properties {
        ...PropertyPreviewFields
        photos { photo }
        propertyCode
        description
      }
      count
    }
  }
`;

export const GET_AGENCIES = gql`
  query (
    $offset: Int
    $limit: Int
    $name: String
    $address: String
    $about: String
    $country: String
    $state: String
    $search: String
  ) {
    getAgencies(
      offset: $offset
      limit: $limit
      name: $name
      address: $address
      about: $about
      country: $country
      state: $state
      search: $search
    ) {
      count
      agencies {
        id
        name
        username
        country
        state
        address
        phoneNumber
        email
        about
        banner
        facebook
        instagram
        twitter
        whatsapp
        properties(offset: 0, limit: 100) {
          id
          photos {
            id
            photo
          }
        }
      }
    }
  }
`;

export const CREATE_AGENCY = gql`
  mutation (
    $name: String!
    $username: String!
    $country: String
    $state: String
    $address: String!
    $phoneNumber: String!
    $email: String
    $about: String!
    $facebook: String
    $twitter: String
    $instagram: String
    $whatsapp: String
  ) {
    createAgency(
      name: $name
      username: $username
      country: $country
      state: $state
      address: $address
      phoneNumber: $phoneNumber
      email: $email
      about: $about
      facebook: $facebook
      twitter: $twitter
      instagram: $instagram
      whatsapp: $whatsapp
    ) {
      id
      name
      username
      country
      state
      address
      phoneNumber
      email
      about
      banner
      facebook
      instagram
      twitter
      whatsapp
    }
  }
`;

export const GET_USER_AGENCY = gql`
  query {
    getUserAgency {
      id
      name
      username
      country
      state
      address
      phoneNumber
      email
      about
      banner
      facebook
      instagram
      twitter
      whatsapp
    }
  }
`;

export const UPDATE_BANNER = gql`
  mutation ($id: ID!, $files: [Upload!]!) {
    updateAgencyBanner(id: $id, files: $files) {
      id
      name
      username
      country
      state
      address
      phoneNumber
      email
      about
      banner
      facebook
      instagram
      twitter
      whatsapp
    }
  }
`;

export const GET_AGENCY_BY_USERNAME = gql`
  query ($username: String!) {
    getAgencyByUsername(username: $username) {
      id
      name
      username
      country
      state
      address
      phoneNumber
      email
      about
      banner
      facebook
      instagram
      twitter
      whatsapp
      properties(offset: 0, limit: 100) {
        id
        photos {
          id
          photo
        }
      }
    }
  }
`;
