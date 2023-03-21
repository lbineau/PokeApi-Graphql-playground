<script setup>
import { computed, ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import _get from 'lodash/get'


defineProps({
  msg: String,
})

const currentType = ref(null)

const { result, loading } = useQuery(gql`
  query samplePokeAPIquery {
    types: pokemon_v2_type {
      id
      name
      typenames: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: "fr"}}}) {
        name
      }
      typeefficacies: pokemon_v2_typeefficacies {
        id
        damage_factor
        typeByTargetTypeId: pokemonV2TypeByTargetTypeId {
          typenames: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: "fr"}}}) {
            name
          }
          name
        }
      }
    }
  }
`)

const types = computed(() => {
  return result.value?.types?.map(item => ({
    id: _get(item, 'id'),
    name: _get(item, 'typenames[0].name', item.name),
    efficacies: _get(item, 'typeefficacies', []).map(item => {
      return {
        id: item.id,
        damageFactor: item.damage_factor / 100,
        name: _get(item, 'typeByTargetTypeId.typenames[0].name', item.name),
      }
    })
  })) ?? []
})

</script>

<template>
  <div v-if="types?.length">
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th class="double-entry-label">
              <span>Attaque</span><br><span>Défense</span>
            </th>
            <th v-for="type in types" :key="type.id">
              {{ type.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in types" :key="type.id">
            <th>{{ type.name }}</th>
            <td tabindex="-1" v-for="efficacy in type.efficacies" :key="efficacy.id">
              {{ efficacy.damageFactor }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else-if="loading">
    Loading
  </div>
</template>

<style scoped lang="scss">
.styled-table th.double-entry-label {
  background: linear-gradient(to right top, #35495e 50%, #009879 50%);
  font-size: x-small;
  font-weight: bolder;
  text-transform: uppercase;
  span {
    display: block;
    &:first-child {
      text-align: right;
      margin-bottom: 0.5rem;
    }
    &:last-child {
      text-align: left;
      margin-top: 0.5rem;
    }
  }
}
.table-container {
}
.styled-table {
  display: inline-table;
  position: relative;
  border-collapse: collapse;
  overflow: hidden;
  margin: 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead {
  position: sticky;
  inset-block-start: 0; /* "top" */
  z-index: 2;
}

.styled-table tbody th{
  position: sticky;
  inset-inline-start: 0; /* "left" */
  z-index: 1;
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

.styled-table th,
.styled-table td {
    padding: 12px 15px;
    position: relative;
    text-align: center;
}

.styled-table th {
  text-align: left;
}

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    // background-color: #484848;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #242424;
}

.styled-table tbody th {
  background-color: #35495e;
}

// Hover

tbody td:hover, tbody td:focus {
  background-color: #391394;
}

tbody td:hover::after,
thead th:not(:empty):hover::after,
tbody td:focus::after,
thead th:not(:empty):focus::after { 
  content: '';  
  height: 10000px;
  left: 0;
  position: absolute;  
  top: -5000px;
  width: 100%;
  z-index: -1;
}

tbody tr:hover,
tbody td:hover::after,
tbody th:hover::after {
  background-color: #000000;
}

tbody tr:focus-within,
tbody td:focus::after,
tbody th:focus::after {
  background-color: #016e53;
}

/* Focus stuff for mobile */
tbody td:focus::before,
tbody th:focus::before {
  background-color: #016e53;
  content: '';  
  height: 100%;
  top: 0;
  left: -5000px;
  position: absolute;  
  width: 10000px;
  z-index: -1;
}

</style>
