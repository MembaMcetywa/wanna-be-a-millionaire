<template>
  <div>
    <div class="welcome-container">
      <div class="welcome-container-header">
        <h1 :style="{ color: headerColor }">Million dollar baby</h1>
        <div class="welcome-container-sub">Click to start</div>
      </div>
      <StartButton @click="startGame">Start Game</StartButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import StartButton from '../components/StartButton.vue'
import { useRouter } from 'vue-router'
import { useGameDetailsStore } from '../stores/gameDetailsStore'

const headerColor = ref('blue')
let colorIndex = 0
const colors = ['blue', '#EDAB18', '#FC5000', 'red']
const { questions, fetchQuestions } = useGameDetailsStore()

const changeColor = () => {
  colorIndex = (colorIndex + 1) % colors.length
  headerColor.value = colors[colorIndex]
}

let intervalId: number

onMounted(async () => {
  intervalId = window.setInterval(changeColor, 500)
  await fetchQuestions()
})

onUnmounted(() => {
  clearInterval(intervalId)
})

const router = useRouter()
const startGame = () => {
  if (questions) {
    router.push({ name: 'game' })
  } else {
    console.error('Something went wrong while fetching questions, please try again.')
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
}
</style>
