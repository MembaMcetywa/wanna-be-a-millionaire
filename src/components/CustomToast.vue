<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal">
      <p>{{ message }}</p>
      <CustomButton @click="close">Close</CustomButton>
    </div>
  </transition>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import CustomButton from '../components/CustomButton.vue'

export default defineComponent({
  name: 'CustomToast',
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const isVisible = ref(false)

    const show = () => {
      isVisible.value = true
      if (props.duration && props.duration > 0) {
        setTimeout(() => {
          isVisible.value = false
        }, props.duration)
      }
    }

    const close = () => {
      isVisible.value = false
    }

    return {
      isVisible,
      show,
      close
    }
  },
  mounted() {
    this.show()
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
  background: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  font-size: 0.875rem;
  color: #0d0e10;
  font-weight: bold;
}
</style>
