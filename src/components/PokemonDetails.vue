<script setup>
import { ref } from 'vue'
import PokemonSelector from './PokemonSelector.vue'

const props = defineProps({
  language: String
})

const pokemon = ref('')
</script>

<template>
  <section>
    <PokemonSelector :language="language" v-model="pokemon" />
  </section>
  <section>
    {{ pokemon }}
  </section>
</template>

<style scoped>
</style>
