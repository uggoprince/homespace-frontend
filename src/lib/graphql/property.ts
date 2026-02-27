import { gql } from '@apollo/client';

export const GET_PROPERTIES_FOR_LANDING_PAGE = gql`
  query {
    getProperties {
      properties {
        id
        address
        propertyType
        price
        intent
        units
        currency
        agency { name, address, username }
        photos { photo }
      }
      count
    }
  }
`;

export const GET_SEARCHED_PROPERTIES = gql`
  query ($offset: Int, $limit: Int, $search: String) {
    getProperties(offset: $offset, limit: $limit, search: $search) {
      properties {
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
        agency { id, name, address, username }
        photos { photo }
        propertyCode
      }
      count
    }
  }
`;

export const GET_PROPERTIES_AND_FILTER = gql`
  query($offset: Int, $limit: Int, $search: String) {
    getPropertiesAndFilter(offset: $offset, limit: $limit, search: $search) {
      properties {
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
        agency { name, address, username }
        photos { photo }
        propertyCode
      }
      count
    }
  }
`;

export const GET_PROPERTY_DETAILS = gql`
  query ($id: ID!) {
    getProperty(id: $id) {
      id
      address
      propertyType
      title
      description
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
      createdAt
      agency { id, name, address, username, email, phoneNumber }
      photos { id, photo }
      propertyCode
      rentPaymentPeriod
    }
  }
`;

export const GET_PROPERTY_DETAILS_BY_CODE = gql`
  query ($propertyCode: String!) {
    getPropertyByCode(propertyCode: $propertyCode) {
      id
      address
      propertyType
      title
      description
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
      createdAt
      agency { id, name, address, username, email, phoneNumber }
      photos { id, photo }
      propertyCode
      rentPaymentPeriod
    }
  }
`;

export const CREATE_PROPERTY = gql`
  mutation (
    $agencyId: ID!
    $title: String!
    $description: String!
    $country: String!
    $state: String!
    $address: String!
    $price: Float!
    $propertyType: String!
    $units: Int!
    $area: String
    $bedRooms: Int
    $bathRooms: Int
    $postedBy: String!
    $intent: String!
    $rentPaymentPeriod: String
    $currency: String
    $files: [Upload!]
  ) {
    createProperty(
      agencyId: $agencyId
      title: $title
      description: $description
      country: $country
      state: $state
      address: $address
      price: $price
      propertyType: $propertyType
      units: $units
      area: $area
      bedRooms: $bedRooms
      bathRooms: $bathRooms
      postedBy: $postedBy
      intent: $intent
      rentPaymentPeriod: $rentPaymentPeriod
      currency: $currency
      files: $files
    ) {
      id
      propertyCode
      title
    }
  }
`;

export const ADD_PROPERTY_PHOTO = gql`
  mutation ($propertyId: ID!, $files: [Upload!]!) {
    addPropertyPhoto(propertyId: $propertyId, files: $files) {
      id
      photo
    }
  }
`;

export const UPDATE_PROPERTY_PHOTO = gql`
  mutation ($id: ID!, $files: [Upload!]!) {
    updatePropertyPhoto(id: $id, files: $files) {
      id
      photo
    }
  }
`;

export const DELETE_PROPERTY_PHOTO = gql`
  mutation ($id: ID!) {
    deletePropertyPhoto(id: $id) {
      message
      status
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation ($id: ID!) {
    deleteProperty(id: $id) {
      message
      count
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation (
    $id: ID!
    $title: String
    $description: String
    $country: String
    $state: String
    $address: String
    $price: Float
    $propertyType: String
    $units: Int
    $area: String
    $bedRooms: Int
    $bathRooms: Int
    $postedBy: String
    $intent: String
    $rentPaymentPeriod: String
    $currency: String
  ) {
    updateProperty(
      id: $id
      title: $title
      description: $description
      country: $country
      state: $state
      address: $address
      price: $price
      propertyType: $propertyType
      units: $units
      area: $area
      bedRooms: $bedRooms
      bathRooms: $bathRooms
      postedBy: $postedBy
      intent: $intent
      rentPaymentPeriod: $rentPaymentPeriod
      currency: $currency
    ) {
      id
      propertyCode
      title
    }
  }
`;
