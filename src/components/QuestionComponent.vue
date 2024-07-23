<template>
  <div class="question">
    <div class="question-text">
      <h2>{{ question.question }}</h2>
      <span class="question-difficulty">{{ question.difficulty }}</span>
    </div>
    <ul>
      <li v-for="option in question.options" :key="option" @click="selectOption(option)">
        <span class="question-option">{{ option }}</span>
        <span class="question-option-details"
          >{{ rewards.scoreIncrease }} points ${{ rewards.winningsIncrease }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Question } from '../utils/types'
import { calculateRewards } from '../utils/helpes'

const props = defineProps<{
  question: Question
}>()

const emits = defineEmits<{
  (event: 'answerSelected', answer: string): void
}>()

const selectOption = (option: string) => {
  emits('answerSelected', option)
}

const rewards = computed(() => {
  const { scoreIncrease, winningsIncrease } = calculateRewards(props.question.difficulty)

  return { scoreIncrease, winningsIncrease }
})
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin: 5px 0;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  color: #0d0e10;
  width: 100%;
}

li:hover {
  background-color: #e0e0e0;
}

.question-option-details {
  color: #666;
  font-size: 0.825rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  display: flex;
  flex-wrap: wrap;
}

.question-option:hover {
  color: #5e7c3c;
}

.question {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  transition: min-width 0.3s ease;
}

.question-difficulty {
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .question {
    width: 100%;
    min-width: 28rem;
  }
}

@media (min-width: 992px) {
  .question {
    width: 100%;
    min-width: 32rem;
  }
}
</style>
