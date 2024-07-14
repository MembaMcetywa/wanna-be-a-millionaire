<template>
  <div>
    <div v-if="currentQuestion">
      <PlayerStatsComponent :totalScore="totalScore" :winnings="winnings" />
      <TimerComponent ref="timer" @timeOut="handleTimeOut" />
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div v-else>
      <h2>Game over! Your score: {{ correctAnswers }}</h2>
      <button @click="restartGame">Restart Game</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import QuestionComponent from './QuestionComponent.vue'
import TimerComponent from './TimerComponent.vue'
import PlayerStatsComponent from './PlayerStatsComponent.vue'

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

<style scoped></style>
