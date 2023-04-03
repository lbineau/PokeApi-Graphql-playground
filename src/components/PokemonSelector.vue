<script setup>
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { QUERY_POKEMONS } from '../services/pokemons'
import _get from 'lodash/get'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  ComboboxButton
} from '@headlessui/vue'

const props = defineProps({
  modelValue: String,
  language: String
})

const { result } = useQuery(QUERY_POKEMONS, () => ({
  language: props.language,
}))

const pokemons = computed(() => {
  return result.value?.languages[0].pokemons.map(pokemon => ({
    name: pokemon.name,
    i18nName: pokemon.name,
    value: pokemon
  }))
})

const filteredPokemon = computed(() =>
  query.value === ''
    ? pokemons.value.slice(0, 10)
    : pokemons.value.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(query.value.toLowerCase())
      }).slice(0, 10)
)
const selectedPokemon = ref({})
const query = ref('')
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="pokemons" v-if="pokemons?.length">
    <Combobox v-model="selectedPokemon">
      <div class="combobox-inner">
        <div class="combobox-input-wrapper">
          <ComboboxInput
            class="combobox-input"
            @change="query = $event.target.value"
            :displayValue="(pokemon) => pokemon.name"
          />
          <ComboboxButton>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd"></path></svg>
          </ComboboxButton>
        </div>
        <ComboboxOptions class="combobox-options">
          <ComboboxOption
            class="combobox-option"
            v-for="pokemon in filteredPokemon"
            :key="pokemon.id"
            :value="pokemon"
            v-slot="{ selected }"
          >
            <span class="icon" v-show="selected"><svg v-once xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd"></path></svg></span>
            {{ pokemon.name }}
          </ComboboxOption>
        </ComboboxOptions>
      </div>
    </Combobox>
  </div>
</template>

<style scoped lang="scss">
.pokemons {
  position: relative;
}

.combobox-input-wrapper {
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  text-align: left;
  width: 100%;
  border-radius: 0.5rem;
  cursor: default;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  button {
    cursor: pointer;
    appearance: button;
    background-color: transparent;
    background-image: none;
    display: flex;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    padding-right: 0.5rem;
    align-items: center;
    svg {
      color: #9CA3AF;
      width: 1.25rem;
      height: 1.25rem;
    }
  }
}
.combobox-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #242424;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0.7em 1em;
  list-style: none;
}

.combobox-input {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  padding-right: 2.5rem;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 1.25rem;
  width: 100%;
  border-style: none;
}

.combobox-option {
  display: flex;
  align-items: center;
  .icon {
    flex-shrink: 0;
    svg {
      display: block;
      width: 1em;
      height: 1em;
    }
  }
}

</style>
