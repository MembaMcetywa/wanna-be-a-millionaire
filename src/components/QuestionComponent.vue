<template>
  <div class="question">
    <h2>{{ question.question }}</h2>
    <ul>
      <li v-for="option in question.options" :key="option" @click="selectOption(option)">
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
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
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

li {
  cursor: pointer;
  margin: 5px 0;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  color: #0d0e10;
}

li:hover {
  background-color: #e0e0e0;
}
</style>
