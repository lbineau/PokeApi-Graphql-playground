<script setup>
import { ref, computed } from 'vue'
import Loader from './components/Loader.vue'
import LanguageSelector from './components/LanguageSelector.vue'

const language = ref('fr')

const languages = computed(() => [
  { name: 'en', i18nName: 'English' },
  { name: 'fr', i18nName: 'Français' },
  { name: 'de', i18nName: 'Deutsch' },
  { name: 'es', i18nName: 'Español' },
  { name: 'it', i18nName: 'Italiano' },
  { name: 'ja', i18nName: '日本語' },
  { name: 'zh-Hans', i18nName: '中文' }
])
</script>

<template>
  <header>
    <h1>
      <img src="./assets/logo.svg" class="logo" alt="" />
      PikAPI
    </h1>
    <LanguageSelector :languages="languages" v-model="language" />
  </header>
  <main>
    <router-view :language="language"  />
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
