<template>
  <p class="timer" :style="{ color: timeLeft <= 10 ? 'red' : '#f5f4f2' }">
    Time left: {{ timeLeft }} {{ timeLeft == 1 ? 'second' : 'seconds' }}
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineExpose } from 'vue'

const emits = defineEmits(['timeOut'])
const timeLeft = ref(30)
let intervalId: any = undefined

function startTimer() {
  clearInterval(intervalId)
  timeLeft.value = 30
  intervalId = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      clearInterval(intervalId)
      emits('timeOut')
    }
  }, 1000)
}

onMounted(startTimer)
onUnmounted(() => {
  clearInterval(intervalId)
})

defineExpose({
  restartTimer: startTimer
})
</script>

<style scoped>
.timer {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: flex;
  justify-content: flex-end;
  font-size: 1rem;
  transition: color 0.5s ease;
}
</style>
