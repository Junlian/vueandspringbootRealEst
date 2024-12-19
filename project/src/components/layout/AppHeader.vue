<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SignInModal from '@/components/auth/SignInModal.vue'
import SignUpModal from '@/components/auth/SignUpModal.vue'

const router = useRouter()
const showSignIn = ref(false)
const showSignUp = ref(false)

const navigateHome = () => {
  router.push('/')
}
</script>

<template>
  <el-header class="app-header">
    <div class="header-content">
      <div class="left">
        <div class="logo" @click="navigateHome">
          <el-icon><House /></el-icon>
          <span>Real Estate</span>
        </div>
        <el-menu mode="horizontal" :ellipsis="false" class="nav-menu">
          <el-menu-item index="1">Buy</el-menu-item>
          <el-menu-item index="2">Rent</el-menu-item>
          <el-menu-item index="3">Sell</el-menu-item>
          <el-menu-item index="4">About</el-menu-item>
        </el-menu>
      </div>

      <div class="right">
        <el-space>
          <el-button @click="router.push('/signin')">Sign In</el-button>
          <el-button type="primary" @click="router.push('/signup')">Sign Up</el-button>
        </el-space>
      </div>
    </div>

    <!-- Auth Modals -->
    <SignInModal v-model="showSignIn" @register="showSignUp = true; showSignIn = false" />
    <SignUpModal v-model="showSignUp" @login="showSignIn = true; showSignUp = false" />
  </el-header>
</template>

<style lang="scss" scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 0;

  .header-content {
    max-width: 1400px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;

    .left {
      display: flex;
      align-items: center;
      gap: 2rem;

      .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--el-color-primary);
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
          opacity: 0.8;
        }

        .el-icon {
          font-size: 1.5rem;
        }
      }

      .nav-menu {
        border-bottom: none;
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .app-header {
    .header-content {
      .left {
        gap: 1rem;

        .logo span {
          display: none;
        }

        .nav-menu {
          :deep(.el-menu-item) {
            padding: 0 10px;
          }
        }
      }
    }
  }
}
</style>