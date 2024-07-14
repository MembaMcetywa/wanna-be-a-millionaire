<template>
  <div>
    <div v-if="currentQuestion">
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

const store = useGameDetailsStore()
const currentIndex = ref(0)
const correctAnswers = ref(0)

const timer = ref<any | null>(null)

const currentQuestion = computed(() => store.questions[currentIndex.value] || null)

function handleAnswer(selectedOption: string) {
  if (selectedOption === currentQuestion.value?.correctAnswer) {
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
  correctAnswers.value = 0
  if (timer.value) {
    timer.value.restartTimer()
  }
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
