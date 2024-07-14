<template>
  <div>
    <div v-if="currentQuestion">
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div v-else>
      <h2>Game over! Your score: {{ correctAnswers }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import QuestionComponent from './QuestionComponent.vue'
import type { Question } from '../utils/types'

const { totalScore, questions, score, increaseCorrectAnswers, increaseWinnings } =
  useGameDetailsStore()

const currentIndex = ref(0)
const correctAnswers = ref(0)

const currentQuestion = computed((): Question | null => {
  return questions[currentIndex.value] || null
})

function handleAnswer(selectedOption: string) {
  if (!currentQuestion.value) return

  if (selectedOption === currentQuestion.value.correctAnswer) {
    correctAnswers.value++
    increaseCorrectAnswers()

    if (currentIndex.value < questions.length - 1) {
      currentIndex.value++
    } else {
      alert('quiz ended')
    }
  }
}

watchEffect(() => {
  console.log('Current state:', {
    questions: questions,
    score: score,
    correctAnswers: correctAnswers.value,
    totalScore: totalScore
  })
})
</script>

<style scoped></style>
