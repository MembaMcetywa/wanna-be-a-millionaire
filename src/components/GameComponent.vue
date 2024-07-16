<template>
  <div class="game-container">
    <div class="game-container-details">
      <PlayerStatsComponent :totalScore="totalScore" :winnings="winnings" />
      <TimerComponent ref="timer" @timeOut="handleTimeOut" />
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div class="game-container-actions">
      <CustomButton @click="handleCashOut">Cash Out $$</CustomButton>
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
import cashOutSound from '../assets/audio/kaching.mp3'
import { useRouter } from 'vue-router'

const store = useGameDetailsStore()
const currentIndex = ref(0)
const router = useRouter()
const timer = ref<any | null>(null)

const currentQuestion = computed(() => store.questions[currentIndex.value] || null)
const totalScore = computed(() => store.score)
const winnings = computed(() => store.winnings)

//instance of cash register sound to be played on cash out
const ballerAlert = new Audio(cashOutSound)

function handleAnswer(selectedOption: string) {
  if (selectedOption === currentQuestion.value?.correctAnswer) {
    store.increaseScoreAndWinnings(currentQuestion.value.difficulty)
    if (currentIndex.value < store.questions.length - 1) {
      currentIndex.value++
      timer.value?.restartTimer()
    } else {
      handleGameEnd()
    }
  } else {
    handleGameEnd()
  }
}

function handleCashOut() {
  ballerAlert.play()
  handleGameEnd()
}

function handleTimeOut() {
  console.log("Time's up!")
  handleGameEnd()
}

function handleGameEnd() {
  store.endGame()
  if (timer.value) {
    clearInterval(timer.value.intervalId)
  }
  router.push({ name: 'summary' })
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
</style>
