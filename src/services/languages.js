import gql from 'graphql-tag'

export const QUERY_LANGUAGES = gql `
query languagesQuery {
  language: language(where: {name: {_in: ["fr", "en", "de", "es"]}}) {
    id
    name
    languagenames: languagenames {
      id
      name
      local_language_id
    }
  }
}
`
