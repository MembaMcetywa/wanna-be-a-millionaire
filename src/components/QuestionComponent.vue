<template>
  <div class="question">
    <h2>{{ question.question }}</h2>
    <ul>
      <li v-for="option in question.options" :key="option" @click="selectOption(option)">
        {{ option }}
        <span class="option-details"
          >{{ rewards.scoreIncrease }} points ${{ rewards.winningsIncrease }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'
import type { Question } from '../utils/types'

const props = defineProps<{
  question: Question
}>()

const emits = defineEmits<{
  (event: 'answerSelected', answer: string): void
}>()

function selectOption(option: string) {
  emits('answerSelected', option)
}

const rewards = computed(() => {
  let scoreIncrease = 0
  let winningsIncrease = 0

  switch (props.question.difficulty) {
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

.option-details {
  color: #666;
}

.question {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 32rem;
}
</style>
