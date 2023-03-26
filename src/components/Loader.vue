<script setup>
import { useGlobalQueryLoading } from '@vue/apollo-composable'

const loading = useGlobalQueryLoading()
</script>

<template>
  <Transition>
    <section class="loader-screen" v-if="loading">
      <img class="loader-logo" src="../assets/pokeball.svg" width="360" height="360" alt="Loading">
    </section>
</Transition>
</template>

<style scoped>
.loader-screen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: grid;
  place-items: center;
  background-color: #242424;
}
.loader-logo {
  animation: rotate 2s infinite cubic-bezier(.68,-0.55,.27,1.55);
  width: 6rem;
  height: 6rem;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
