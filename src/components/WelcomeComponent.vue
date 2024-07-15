<template>
  <div class="welcome-container">
    <div class="welcome-container-header">
      <h1 :style="{ color: headerColor }">Skyf A Million</h1>
      <p class="welcome-container-sub">No prep, just vibes. Guaranteed win. Click to start.</p>
    </div>
    <StartButton @click="startGame">Start Game</StartButton>
    <p class="welcome-container-sub">Current Score: {{ totalScore }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import StartButton from './CustomButton.vue'
import { useRouter } from 'vue-router'
import { useGameDetailsStore } from '../stores/gameDetailsStore'

let colorIndex = 0
let intervalId: number
const headerColor = ref('blue')
const colors = ['blue', '#FC5000', '#EDAB18', 'red']
const router = useRouter()
const store = useGameDetailsStore()
let totalScore = computed(() => store.score)

const changeColor = () => {
  colorIndex = (colorIndex + 1) % colors.length
  headerColor.value = colors[colorIndex]
}

onMounted(async () => {
  intervalId = window.setInterval(changeColor, 500)
  await store.fetchQuestions()
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const startGame = () => {
  if (store.questions) {
    store.score = 0
    router.push({ name: 'game' })
  } else {
    console.error('Something went wrong while preparing questions, please try again.')
    return
  }
}
</script>

<style scoped>
@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}

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
}
.welcome-container-header h1 {
  font-weight: 600;
  letter-spacing: 0.125rem;
}
.welcome-container-sub {
  font-size: 0.8125rem;
  font-weight: 600;
}
</style>
