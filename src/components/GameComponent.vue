<template>
  <div v-if="currentQuestion" class="game-container">
    <div class="game-container-details">
      <PlayerStatsComponent :totalScore="totalScore" :winnings="winnings" />
      <TimerComponent ref="timer" @timeOut="handleTimeOut" />
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div class="game-container-actions">
      <CustomButton @click="endGame">Cash Out $$</CustomButton>
    </div>
  </div>
  <div v-else>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import QuestionComponent from './QuestionComponent.vue'
import TimerComponent from './TimerComponent.vue'
import PlayerStatsComponent from './PlayerStatsComponent.vue'
import CustomButton from './CustomButton.vue'

const store = useGameDetailsStore()
const currentIndex = ref(0)
const correctAnswers = ref(0)
const totalScore = computed(() => store.totalScore)
const winnings = computed(() => store.winnings)
const timer = ref<any | null>(null)
const currentQuestion = computed(() => store.questions[currentIndex.value] || null)

function handleAnswer(selectedOption: string) {
  if (selectedOption === currentQuestion.value?.correctAnswer) {
    store.increaseWinnings(10)
    correctAnswers.value++
    store.increaseCorrectAnswers()
    if (currentIndex.value < store.questions.length - 1) {
      currentIndex.value++
      timer.value?.restartTimer()
    } else {
      endGame()
    }
  } else {
    endGame()
  }
}

function handleTimeOut() {
  console.log("Time's up!")
  endGame()
}

function restartGame() {
  currentIndex.value = 0
  store.score = 0
  store.winnings = 10
  store.correctAnswers = 0
  timer.value?.restartTimer()
}

function endGame() {
  currentIndex.value = store.questions.length
  if (timer.value) {
    clearInterval(timer.value.intervalId)
  }
}

onMounted(() => {
  if (timer.value) {
    timer.value.restartTimer()
  }
})
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.game-container-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.game-over-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.game-over-container h2 {
  font-weight: 600;
}

.game-over-container h2:hover {
  font-weight: 600;
  text-decoration: line-through;
  cursor: pointer;
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
