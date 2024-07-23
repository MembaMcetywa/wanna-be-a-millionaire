<template>
  <section class="game-container">
    <div class="game-container-details">
      <PlayerStatsComponent :totalScore="totalScore" :winnings="winnings" />
      <TimerComponent ref="timer" @timeOut="handleTimeOut" />
      <QuestionComponent :question="currentQuestion" @answerSelected="handleAnswer" />
    </div>
    <div class="game-container-actions">
      <CustomButton @click="handleCashOut">Cash Out $$</CustomButton>
      <CustomButton
        v-if="!store.isRemoveWrongAnswersTriggered"
        @click="removeWrongAnswers"
        class="feeling-lucky"
        :key="animationKey"
        >Feeling Lucky</CustomButton
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameDetailsStore } from '../stores/gameDetailsStore'
import QuestionComponent from './QuestionComponent.vue'
import TimerComponent from './TimerComponent.vue'
import PlayerStatsComponent from './PlayerStatsComponent.vue'
import CustomButton from './CustomButton.vue'
import cashOutSound from '../assets/audio/kaching.mp3'
import { useRouter } from 'vue-router'

const store = useGameDetailsStore()
const currentIndex = ref(0)
const router = useRouter()
const timer = ref<any>(null)
const animationTimer = ref<any>(null)
const animationKey = ref(0)

const currentQuestion = computed(() => store.questions[currentIndex.value] || null)
const totalScore = computed(() => store.score)
const winnings = computed(() => store.winnings)

//instance of cash register sound to be played on cash out
const ballerAlert = new Audio(cashOutSound)
const feelingLuckyActive = ref<boolean>(false) //animation trigger

const handleAnswer = (selectedOption: string) => {
  if (selectedOption === currentQuestion.value?.correctAnswer) {
    store.increaseScoreAndWinnings(currentQuestion.value.difficulty)
    if (currentIndex.value < store.questions.length - 1) {
      currentIndex.value++
      timer.value?.restartTimer()
    } else {
      handleGameEnd()
    }
  } else {
    handleGameEnd()
  }
}

const removeWrongAnswers = () => {
  const correctAnswer = currentQuestion.value.correctAnswer
  const options = currentQuestion.value.options
  const wrongAnswers = options.filter((item) => item !== correctAnswer)
  wrongAnswers.sort(() => Math.random() - 0.5)

  const remainingWrongAnswers = wrongAnswers.slice(0, 1)
  const finalOptions = [correctAnswer, ...remainingWrongAnswers]
  currentQuestion.value.options = finalOptions
  store.isRemoveWrongAnswersTriggered = true
}

const triggerFeelingLuckyAnimation = () => {
  feelingLuckyActive.value = true
  animationKey.value++
  setTimeout(() => {
    feelingLuckyActive.value = false
  }, 1500)
}

const handleCashOut = () => {
  ballerAlert.play()
  handleGameEnd()
}

const handleTimeOut = () => {
  console.log("Time's up!")
  handleGameEnd()
}

const handleGameEnd = () => {
  store.endGame()
  if (timer.value) {
    clearInterval(timer.value.intervalId)
  }
  router.push({ name: 'summary' })
}

onMounted(() => {
  if (timer.value) {
    timer.value.restartTimer()
  }
  animationTimer.value = setInterval(triggerFeelingLuckyAnimation, 5000)
})

onUnmounted(() => {
  if (animationTimer.value) {
    clearInterval(animationTimer.value)
  }
})
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  overflow-y: auto;
  transition: max-width 0.3s ease;
  width: 100%;
  min-width: 21rem;
}

@media (min-width: 768px) {
  .game-container {
    width: 30rem;
  }
}

@media (min-width: 992px) {
  .game-container {
    width: 40rem;
    gap: 3rem;
  }
}

.game-container-details {
  height: fit-content;
  width: 100%;
}

.game-container-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  width: 100%;
}

.feeling-lucky {
  animation: pulse 1.5s;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
