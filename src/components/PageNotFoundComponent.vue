<template>
  <div class="game-over-container">
    <h2>Oops! Wrong Page</h2>
    <p>This page doesn't exist. Return home to play a game.</p>
    <div class="game-over-container-actions">
      <CustomButton @click="navigateHome">Go Home</CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import CustomButton from '../components/CustomButton.vue'

const store = useGameDetailsStore()
const router = useRouter()

function navigateHome() {
  store.endGame()
  router.push({ name: 'home' })
}
</script>
<style>
.game-over-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.game-over-container h2 {
  font-weight: 600;
  transition: color 0.3s ease;
}

.game-over-container h2:hover {
  text-decoration: line-through;
  cursor: pointer;
  color: red;
}
</style>
