<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal">
      <p>{{ message }}</p>
      <CustomButton @click="close">Close</CustomButton>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import CustomButton from './CustomButton.vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 2000
  }
})

//using watch to react to changes in the message prop
const isVisible = ref(false)
watch(
  () => props.message,
  (newMessage) => {
    if (newMessage) {
      show()
    }
  },
  { immediate: true }
)

//responsible for handling toast visibility. uses a given or default (2s) duration
const show = () => {
  isVisible.value = true
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
}

const close = () => {
  isVisible.value = false
}

onMounted(() => {
  if (props.message) {
    show()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  padding: 15px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 1000;
  font-size: 0.875rem;
  color: #0d0e10;
}
</style>
