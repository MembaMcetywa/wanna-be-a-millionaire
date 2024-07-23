<template>
  <CustomToast ref="errorModal" :message="errorMessage" />
  <section class="welcome-container">
    <header class="welcome-container-header">
      <h1 :style="{ color: headerColor }">Skyf A Million</h1>
      <p class="welcome-container-sub">No prep, just vibes. Guaranteed win. Click to start.</p>
    </header>
    <StartButton @click="startGame">Start Game</StartButton>
    <p class="welcome-container-sub">Current Score: {{ totalScore }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import StartButton from './CustomButton.vue'
import CustomToast from './CustomToast.vue'

let colorIndex = 0
let intervalId: number
const headerColor = ref('blue')
const colors = ['blue', '#FC5000', '#EDAB18', 'red']
const router = useRouter()
const store = useGameDetailsStore()
const errorModal = ref<any>(null)
const errorMessage = ref('')
let totalScore = computed(() => store.score)

const changeColor = () => {
  colorIndex = (colorIndex + 1) % colors.length
  headerColor.value = colors[colorIndex]
}

const fetchQuestions = async () => {
  try {
    await store.fetchQuestions()
  } catch (error) {
    errorMessage.value = 'Failed to load questions. Please refresh & try again.'
    errorModal.value?.show()
  }
}

onMounted(() => {
  intervalId = window.setInterval(changeColor, 500)
  fetchQuestions()
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const startGame = () => {
  if (store.questions.length > 0) {
    store.reset()
    router.push({ name: 'game' })
  } else {
    errorMessage.value = 'Something went wrong while preparing questions, please try again.'
    console.error('Something went wrong while preparing questions, please try again.')
    return
  }
}
</script>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.welcome-container-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.welcome-container-header h1 {
  font-weight: 600;
  letter-spacing: 0.125rem;
}
.welcome-container-sub {
  font-size: 0.8125rem;
  font-weight: 600;
  text-align: center;
}
</style>
