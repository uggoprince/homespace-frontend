import gql from 'graphql-tag';

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
    }
    count
  }
}
`;

export const GET_PROPERTIES_START_WITH_COUNTRY = gql`
  query($offset: Int, $limit: Int, $search: String) {
    getPropertiesStartWithCountry(offset: $offset, limit: $limit, search: $search) {
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
    agency { id, name, address, username, email }
    photos { photo }
  }
}
`;
