<script setup>
import EfficacyTable from './components/EfficacyTable.vue'
import { provide } from 'vue'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
})
// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

provide(DefaultApolloClient, apolloClient)
</script>

<template>
  <h1>
    <img src="./assets/logo.svg" class="logo" alt="PokéApi Graphql playground" />
  </h1>
  <EfficacyTable />
</template>

<style scoped>
.logo {
  position: relative;
  z-index: 3;
  height: 4em;
  margin-bottom: -0.6rem;
  display: block;
  will-change: filter;
  transition: filter 300ms;
}
</style>
