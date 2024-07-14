import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Question } from '../utils/types'

export const useGameDetailsStore = defineStore('gameDetails', () => {
  const questions = ref<Question[]>([])
  const score = ref<number>(0)
  const winnings = ref<number>(10)
  const correctAnswers = ref<number>(0)
  const increaseCorrectAnswers = computed(() => correctAnswers.value++)
  const wrongAnswers = ref<number>(0)

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions')
      questions.value = response.data
      console.log('Questions fetched and stored:', questions.value)
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    }
  }

  return { score, winnings, correctAnswers, wrongAnswers, questions, fetchQuestions }
})
