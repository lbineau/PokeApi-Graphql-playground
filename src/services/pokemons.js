import gql from 'graphql-tag'

export const QUERY_POKEMONS = gql `
query pokemonsQuery($language: String!) {
  languages: pokemon_v2_language(where: {name: {_eq: $language}}) {
    pokemons: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: $language}}}) {
      name
      language: pokemon_v2_language {
        types: pokemon_v2_typenames {
          type_id
        }
      }
    }
  }
}
`
