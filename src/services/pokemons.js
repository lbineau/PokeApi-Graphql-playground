import gql from 'graphql-tag'

export const QUERY_POKEMONS = gql `
query pokemonsQuery($language: String!) {
  languages: language(where: {name: {_eq: $language}}) {
    pokemons: pokemonspeciesnames(where: {language: {name: {_eq: $language}}}) {
      name
      language: language {
        types: typenames {
          type_id
        }
      }
    }
  }
}
`
