import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import type { Question } from '../utils/types'

export const useGameDetailsStore = defineStore('gameDetailsStore', () => {
  const questions = ref<Question[]>([])
  const score = ref<number>(0)
  const winnings = ref<number>(10)
  const correctAnswers = ref<number>(0)

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions')
      questions.value = response.data
      console.log('Questions fetched and stored:', questions.value)
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    }
  }

  const increaseCorrectAnswers = () => {
    correctAnswers.value++
  }

  const increaseWinnings = (amount: number) => {
    winnings.value += amount
  }

  const totalScore = computed(() => correctAnswers.value * 10)

  return {
    questions,
    score,
    winnings,
    correctAnswers,
    fetchQuestions,
    increaseCorrectAnswers,
    increaseWinnings,
    totalScore
  }
})
