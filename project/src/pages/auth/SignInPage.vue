<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthForm from '@/components/auth/AuthForm.vue'

const router = useRouter()
const loading = ref(false)

const handleSignIn = async (credentials: { email: string; password: string }) => {
  try {
    loading.value = true
    console.log('Signing in:', credentials)
    // TODO: Implement sign in logic
    router.push('/')
  } catch (error) {
    console.error('Sign in error:', error)
  } finally {
    loading.value = false
  }
}

const handleSwitch = () => {
  router.push('/signup')
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-content">
        <div class="logo" @click="router.push('/')">
          <el-icon :size="32"><House /></el-icon>
          <span>Real Estate</span>
        </div>
        
        <AuthForm
          mode="signin"
          :loading="loading"
          @submit="handleSignIn"
          @switch="handleSwitch"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--el-color-primary-light-9) 0%, #fff 100%);
  padding: 2rem;

  .auth-container {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .auth-content {
      padding: 2rem;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        cursor: pointer;
        color: var(--el-color-primary);
        font-size: 1.5rem;
        font-weight: 600;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .auth-page {
    padding: 0;

    .auth-container {
      min-height: 100vh;
      border-radius: 0;
    }
  }
}
</style> 