import gql from 'graphql-tag'

export const QUERY_LANGUAGES = gql `
query languagesQuery {
  language: pokemon_v2_language(where: {name: {_in: ["fr", "en", "de", "es"]}}) {
    id
    name
    languagenames: pokemon_v2_languagenames {
      id
      name
      local_language_id
    }
  }
}
`
