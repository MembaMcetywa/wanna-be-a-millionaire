<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
import HelloWorld from './components/HelloWorld.vue'
import WelcomeMessage from './components/WelcomeMessage.vue'

axios.get('https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions').then((response) => {
  console.log('here', response)
})
</script>

<template>
  <div class="wrapper">
    <WelcomeMessage />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
