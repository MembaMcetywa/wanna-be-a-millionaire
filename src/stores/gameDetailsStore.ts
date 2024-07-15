// In your useGameDetailsStore definition
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

  const increaseScoreAndWinnings = (difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard') => {
    let scoreIncrease = 0
    let winningsIncrease = 0

    switch (difficulty) {
      case 'Easy':
        scoreIncrease = 3
        winningsIncrease = 50
        break
      case 'Medium':
        scoreIncrease = 5
        winningsIncrease = 80
        break
      case 'Hard':
        scoreIncrease = 7
        winningsIncrease = 200
        break
      case 'Very Hard':
        scoreIncrease = 10
        winningsIncrease = 300
        break
    }

    score.value += scoreIncrease
    winnings.value += winningsIncrease
    correctAnswers.value++
  }

  return {
    questions,
    score,
    winnings,
    correctAnswers,
    fetchQuestions,
    increaseScoreAndWinnings
  }
})
