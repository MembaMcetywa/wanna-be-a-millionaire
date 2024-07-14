<template>
  <div class="stats">
    <p>Total Score: {{ totalScore }}</p>
    <p>Winnings: ${{ winnings }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  totalScore: Number,
  winnings: Number
})
</script>

<style scoped>
.stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  color: #f5f4f2;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}
</style>
