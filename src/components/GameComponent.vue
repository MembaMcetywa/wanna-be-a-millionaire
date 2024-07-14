<template>
  <div>
    <h2>Game Screen</h2>
    <div v-if="questions.length > 0">
      <div v-for="(question, index) in questions" :key="index">
        <p>{{ question }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameDetailsStore } from '../stores/gameDetailsStore'

const { questions } = useGameDetailsStore()

console.log('Questions in GameComponent:', questions)
</script>

<style scoped></style>
