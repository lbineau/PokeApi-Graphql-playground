<script setup>
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { QUERY_TYPES } from '../services/types'
import _get from 'lodash/get'

const props = defineProps({
  language: String
})

const { result } = useQuery(QUERY_TYPES, () => ({
  language: props.language,
}))

const types = computed(() => {
  return result.value?.types?.map(item => ({
    id: _get(item, 'id'),
    name: item.name,
    i18nName: _get(item, 'typenames[0].name', item.name),
    efficacies: _get(item, 'typeefficacies', []).map(item => {
      return {
        id: item.id,
        damageFactor: item.damage_factor,
        text: (() => {
          switch(item.damage_factor) {
            case 0: return '0'
            case 50: return '0.5'
            case 100: return '1'
            case 200: return '2'
          }
        })(),
        name: item.name,
        efficacyClassName: (() => {
          switch(item.damage_factor) {
            case 0: return 'no-effect'
            case 50: return 'not-very-effective'
            case 100: return 'effective'
            case 200: return 'super-effective'
          }
        })(),
        i18nName: _get(item, 'typeByTargetTypeId.typenames[0].name', item.name),
      }
    })
  })).filter(item => _get(item, 'efficacies', []).length > 0) ?? []
})

</script>

<template>
  <div v-if="types?.length">
    <div class="table-container">
      <table class="styled-table">
        <thead>
          <tr>
            <th class="double-entry-label">
              <span><img src="../assets/shield.svg" alt="Defense"></span><span><img src="../assets/sword.svg" alt="Attack"></span>
            </th>
            <th v-for="type in types" :key="type.id">
              <div class="icon" :class="type.name"><img :src="`/icons/types/${type.name}.svg`" width="30" height="30" :alt="type.i18nName" /></div>
              {{ type.i18nName }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in types" :key="type.id">
            <th>
              <div class="icon" :class="type.name"><img :src="`/icons/types/${type.name}.svg`" width="30" height="30" :alt="type.i18nName" /></div>
              {{ type.i18nName }}
            </th>
            <td :class="efficacy.efficacyClassName" tabindex="-1" v-for="efficacy in type.efficacies" :key="efficacy.id">
              <div class="data">{{ efficacy.text }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.styled-table {
  width: 100%;

  th.double-entry-label {
    background: linear-gradient(to right top, #35495e 50%, #016e53 50%);
    font-size: x-small;
    font-weight: bolder;
    text-transform: uppercase;
    position: sticky;
    left: 0;
    z-index: 3;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    padding: 0 0.6rem;
    span {
      display: block;
      img {
        opacity: 0.87;
        display: inline-block;
        width: 2rem;
        height: 2rem;
      }
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
  & {
    position: relative;
    border-collapse: collapse;
    overflow: hidden;
    margin: 0;
    font-size: 0.9em;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    @supports (contain: paint) {
      contain: paint;
      overflow: auto;
    }
  }

  thead {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tbody th{
    position: sticky;
    left: 0;
    z-index: 1;
  }

  thead tr {
    background-color: #016e53;
    text-align: left;
  }

  th,
  td {
    padding: 12px 15px;
    position: relative;
    text-align: center;
  }

  th {
    text-align: center;
    font-size: small;
    .icon {
      border-radius: 100%;
      margin: 0 auto;
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      height: 30px;
      width: 30px;
      img {
        display: block;
        margin: auto;
      }
    }
  }

  tbody td {
    border: 1px solid #333;
    font-size: 0.8rem;
    font-weight: 600;
    position: relative;
    color: #242424;
    .data {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      position: relative;
      background-color: var(--cell-color);
      border-radius: 100%;
      transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
    }
    &.no-effect {
      --cell-color: #A0A29F;
    }
    &.not-very-effective {
      --cell-color: #D3425F;
    }
    &.effective {
      --cell-color: transparent;
      color: transparent;
    }
    &.super-effective {
      --cell-color: #5FBD58;
    }
  }

  tbody tr:nth-of-type(even) {
      // background-color: #484848;
  }

  tbody tr:last-of-type {
      border-bottom: 2px solid #242424;
  }

  tbody th {
    background-color: #35495e;
  }

  // Hover

  tbody td:hover, tbody td:focus {
    --cell-color: #F2D94E;
    color: #000000;
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
  tbody td:hover::after {
    background-color: rgba(#333, 0.5);
  }

  tbody tr:focus-within {
    background-color: #35495e;
  }
  tbody td:focus::after {
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
}

</style>
