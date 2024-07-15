import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Question } from '../utils/types'

export const useGameDetailsStore = defineStore('gameDetailsStore', () => {
  const questions = ref<Question[]>([])
  const score = ref<number>(0)
  const recentScore = ref(0)
  const winnings = ref<number>(10)
  const correctAnswers = ref<number>(0)
  const currentIndex = ref<number>(0)

  const restartGame = () => {
    recentScore.value = score.value
    currentIndex.value = 0
    score.value = 0
    winnings.value = 10
    correctAnswers.value = 0
  }

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ENDPOINT)
      questions.value = response.data
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

  const endGame = () => {
    recentScore.value = score.value
    currentIndex.value = questions.value.length
  }

  return {
    questions,
    currentIndex,
    score,
    winnings,
    recentScore,
    correctAnswers,
    endGame,
    restartGame,
    fetchQuestions,
    increaseScoreAndWinnings
  }
})
