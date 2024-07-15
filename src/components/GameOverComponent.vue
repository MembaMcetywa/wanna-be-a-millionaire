<template>
  <div class="game-over-container">
    <h2>Game over!</h2>
    <ul class="game-over-container-summary">
      <li>
        Your score: <span class="summary-value">{{ totalScore }}</span>
      </li>
      <li>
        Correct answers: <span class="summary-value">{{ correctAnswers }}</span>
      </li>
      <li>
        Winnings: <span class="summary-value">${{ winnings }}</span>
      </li>
    </ul>
    <CustomButton @click="restartGame">Restart Game</CustomButton>
    <CustomButton @click="navigateHome">Go Home</CustomButton>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import CustomButton from './CustomButton.vue'
import { useRouter } from 'vue-router'

const store = useGameDetailsStore()
const totalScore = computed(() => store.score)
const correctAnswers = computed(() => store.correctAnswers)
const winnings = computed(() => store.winnings)
const router = useRouter()

function restartGame() {
  store.restartGame()
  router.push({ name: 'game' })
}
function navigateHome() {
  store.endGame()
  router.push({ name: 'home' })
}
</script>

<style scoped>
.game-over-container {
  display: flex;
  flex-direction: column;
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

.game-over-container-summary {
  padding: 0;
  list-style-type: none;
  font-size: 1rem;
}

.summary-value {
  font-weight: 600;
  color: #f5f4f2;
}
</style>
