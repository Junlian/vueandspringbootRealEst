<script setup lang="ts">
import { ref } from 'vue'
import { Message, Lock, User } from '@element-plus/icons-vue'

const props = defineProps<{
  mode: 'signin' | 'signup'
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', credentials: { email: string; password: string }): void
  (e: 'switch'): void
}>()

const form = ref({
  email: '',
  password: '',
  name: ''
})

const rules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  name: [
    { required: props.mode === 'signup', message: 'Name is required', trigger: 'blur' }
  ]
}

const formRef = ref()

const handleSubmit = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('submit', form.value)
    }
  })
}
</script>

<template>
  <div class="auth-form">
    <div class="form-header">
      <el-icon :size="40" color="var(--el-color-primary)">
        <User v-if="mode === 'signup'" />
        <Lock v-else />
      </el-icon>
      <h2>{{ mode === 'signin' ? 'Welcome Back' : 'Create Account' }}</h2>
      <p class="subtitle">
        {{ mode === 'signin' ? 'Sign in to continue' : 'Fill in your details to get started' }}
      </p>
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      @submit.prevent="handleSubmit"
      class="form-content"
    >
      <template v-if="mode === 'signup'">
        <el-form-item label="Full Name" prop="name">
          <el-input 
            v-model="form.name" 
            placeholder="Enter your full name"
            :prefix-icon="User"
          />
        </el-form-item>
      </template>

      <el-form-item label="Email" prop="email">
        <el-input 
          v-model="form.email" 
          placeholder="Enter your email"
          type="email"
          :prefix-icon="Message"
        />
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input 
          v-model="form.password" 
          placeholder="Enter your password"
          type="password"
          :prefix-icon="Lock"
          show-password
        />
      </el-form-item>

      <div class="form-footer">
        <el-button 
          type="primary" 
          native-type="submit"
          :loading="loading"
          class="submit-btn"
          size="large"
          round
        >
          {{ mode === 'signin' ? 'Sign In' : 'Create Account' }}
        </el-button>

        <div class="switch-mode">
          <p>
            {{ mode === 'signin' ? "Don't have an account?" : 'Already have an account?' }}
            <el-button 
              link 
              type="primary"
              @click="emit('switch')"
            >
              {{ mode === 'signin' ? 'Sign Up' : 'Sign In' }}
            </el-button>
          </p>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.auth-form {
  padding: 1rem;

  .form-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      margin: 1rem 0 0.5rem;
      color: var(--el-text-color-primary);
      font-size: 1.5rem;
    }

    .subtitle {
      color: var(--el-text-color-secondary);
      font-size: 0.875rem;
    }
  }

  .form-content {
    max-width: 320px;
    margin: 0 auto;

    .el-form-item {
      margin-bottom: 1.5rem;
    }
  }

  .form-footer {
    margin-top: 2rem;
    text-align: center;

    .submit-btn {
      width: 100%;
      height: 40px;
      font-size: 1rem;
    }

    .switch-mode {
      margin-top: 1.5rem;
      color: var(--el-text-color-secondary);
      font-size: 0.875rem;

      .el-button {
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
  }
}
</style> 