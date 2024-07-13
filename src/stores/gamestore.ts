import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Question } from '../utils/types'

export const useGameDetailsStore = defineStore('game-details', () => {
  const questions = ref<any[]>([])

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_APP_API_ENDPOINT)
      questions.value = response.data
      console.log('Questions fetched and stored:', questions.value)
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    }
  }

  return { questions, fetchQuestions }
})
