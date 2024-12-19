<script setup lang="ts">
import { ref } from 'vue'
import AuthForm from './AuthForm.vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'register'): void
}>()

const loading = ref(false)

const handleSignIn = async (credentials: { email: string; password: string }) => {
  try {
    loading.value = true
    console.log('Signing in:', credentials)
    // TODO: Implement sign in logic
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Sign in error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-dialog
    :visible="modelValue"
    @update:visible="(val) => emit('update:modelValue', val)"
    width="480px"
    destroy-on-close
    :show-close="false"
    class="auth-dialog"
  >
    <AuthForm
      mode="signin"
      :loading="loading"
      @submit="handleSignIn"
      @switch="$emit('register')"
    />
  </el-dialog>
</template>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  display: none;
}

:deep(.el-dialog__body) {
  padding: 0;
}
</style>