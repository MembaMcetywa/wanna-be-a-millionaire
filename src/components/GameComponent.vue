<template>
  <div class="game-container">
    <div class="game-container-details">
      <PlayerStatsComponent :totalScore="totalScore" :winnings="winnings" />
      <TimerComponent ref="timer" @timeOut="handleTimeOut" />
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div class="game-container-actions">
      <CustomButton @click="endGame">Cash Out $$</CustomButton>
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
import { useRouter } from 'vue-router'

const store = useGameDetailsStore()
const currentIndex = ref(0)
const router = useRouter()
const timer = ref<any | null>(null)

const currentQuestion = computed(() => store.questions[currentIndex.value] || null)
const totalScore = computed(() => store.score)
const winnings = computed(() => store.winnings)

function handleAnswer(selectedOption: string) {
  if (selectedOption === currentQuestion.value?.correctAnswer) {
    store.increaseScoreAndWinnings(currentQuestion.value.difficulty)
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

function endGame() {
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
