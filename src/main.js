import { createApp, provide, h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'normalize.css'
import './style.css'
import App from './App.vue'

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import EfficacyTable from './components/EfficacyTable.vue'
import PokemonDetails from './components/PokemonDetails.vue'

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

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: EfficacyTable },
  { path: '/pokemon', component: PokemonDetails }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

.mount('#app')
