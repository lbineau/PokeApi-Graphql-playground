import gql from 'graphql-tag'

export const QUERY_TYPES = gql `
  query typesQuery ($language: String!) {
    types: pokemon_v2_type {
      id
      name
      typenames: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: $language}}}) {
        id
        name
      }
      typeefficacies: pokemon_v2_typeefficacies {
        id
        damage_factor
        typeByTargetTypeId: pokemonV2TypeByTargetTypeId {
          id
          typenames: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: $language}}}) {
            id
            name
          }
          name
        }
      }
    }
  }
`
