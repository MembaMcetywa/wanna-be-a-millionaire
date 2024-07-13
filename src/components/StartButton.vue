<template>
  <div
    role="button"
    tabindex="0"
    aria-label="button"
    @click="handleClick"
    @keypress="handleKeyPress"
    class="button-div"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  setup(props, { emit }) {
    const handleClick = () => {
      emit('click')
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        handleClick()
      }
    }

    return {
      handleClick,
      handleKeyPress
    }
  }
})
</script>

<style scoped>
.button-div {
  display: inline-flex;
  justify-content: center;
  width: 12rem;
  padding: 0.5rem 1.5rem;
  font-size: 16px;
  color: white;
  background-color: blue;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
</style>
