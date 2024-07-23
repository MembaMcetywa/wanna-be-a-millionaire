import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Difficulty, Question } from '../utils/types'
import router from '@/router'
import { calculateRewards } from '../utils/helpes'

export const useGameDetailsStore = defineStore('gameDetailsStore', () => {
  const questions = ref<Question[]>([])
  const score = ref<number>(0)
  const recentScore = ref(0)
  const winnings = ref<number>(10)
  const correctAnswers = ref<number>(0)
  const currentIndex = ref<number>(0)
  const originalQuestions = ref<Question[]>([])
  //keeping a copy of the original question options to use when reseting the options whenever game is started / restarted
  questions.value = originalQuestions.value.map((q) => ({ ...q, options: [...q.options] }))

  const isRemoveWrongAnswersTriggered = ref<boolean>(false)

  const restartGame = () => {
    recentScore.value = score.value
    currentIndex.value = 0
    score.value = 0
    winnings.value = 10
    correctAnswers.value = 0
    isRemoveWrongAnswersTriggered.value = false
    questions.value = originalQuestions.value.map((q) => ({ ...q, options: [...q.options] }))
  }

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_ENDPOINT)
      questions.value = response.data
      originalQuestions.value = response.data.map((q: any) => ({ ...q, options: [...q.options] }))
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    }
  }

  const increaseScoreAndWinnings = (difficulty: Difficulty) => {
    const { scoreIncrease, winningsIncrease } = calculateRewards(difficulty)

    score.value += scoreIncrease
    winnings.value += winningsIncrease
    correctAnswers.value++
  }

  const endGame = () => {
    recentScore.value = score.value
    currentIndex.value = questions.value.length
    isRemoveWrongAnswersTriggered.value = false
  }

  const reset = () => {
    score.value = 0
    winnings.value = 10
    correctAnswers.value = 0
    isRemoveWrongAnswersTriggered.value = false
  }
  return {
    questions,
    currentIndex,
    score,
    winnings,
    originalQuestions,
    recentScore,
    correctAnswers,
    isRemoveWrongAnswersTriggered,
    endGame,
    reset,
    restartGame,
    fetchQuestions,
    increaseScoreAndWinnings
  }
})
