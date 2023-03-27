<script setup>
import { ref, computed } from 'vue'
import EfficacyTable from './components/EfficacyTable.vue'
import Loader from './components/Loader.vue'
import LanguageSelector from './components/LanguageSelector.vue';
import { useQuery } from '@vue/apollo-composable'
import { QUERY_LANGUAGES } from './services/languages'

const language = ref('fr')

const { result } = useQuery(QUERY_LANGUAGES)
const languages = computed(() => {
  return result.value?.language?.map(item => {
    return {
      id: item.id,
      name: item.name,
      i18nName: item.languagenames.find(languagename => languagename.local_language_id === item.id).name
    }
  })
})
</script>

<template>
  <header>
    <h1>
      <img src="./assets/logo.svg" class="logo" alt="PokéApi Graphql playground" />
      PokéApi
    </h1>
    <LanguageSelector :languages="languages" v-model="language" />
  </header>
  <main>
    <EfficacyTable :language="language" />
  </main>
  <Loader />
</template>

<style scoped>
header {
  position: relative;
  z-index: 20;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  margin: -0.5rem auto;
}
.logo {
  height: 3em;
  display: inline-block;
}
h1 {
  display: flex;
  gap: 1rem;
  align-items: center;
  text-transform: uppercase;
  font-size: 2rem;
}
.languages {
  width: 10rem;
}
</style>
