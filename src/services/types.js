import gql from 'graphql-tag'

export const QUERY_TYPES = gql `
  query typesQuery ($language: String!) {
    types: type {
      id
      name
      typenames: typenames(where: {language: {name: {_eq: $language}}}) {
        id
        name
      }
      typeefficacies: typeefficacies {
        id
        damage_factor
        typeByTargetTypeId: TypeByTargetTypeId {
          id
          typenames: typenames(where: {language: {name: {_eq: $language}}}) {
            id
            name
          }
          name
        }
      }
    }
  }
`
