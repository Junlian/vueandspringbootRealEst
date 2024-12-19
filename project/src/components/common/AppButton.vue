<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button 
    :class="[
      'app-button',
      `app-button--${variant || 'primary'}`,
      `app-button--${size || 'medium'}`
    ]"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.app-button {
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &--primary {
    background-color: var(--primary-color);
    color: white;
    border: none;
    
    &:hover {
      background-color: var(--primary-color-dark);
    }
  }

  &--medium {
    padding: 0.6em 1.2em;
    font-size: 1em;
  }
}
</style>