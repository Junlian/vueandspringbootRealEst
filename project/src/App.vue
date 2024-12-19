<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <el-config-provider>
    <div class="app">
      <AppHeader />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </el-config-provider>
</template>

<style lang="scss">
.app {
  min-height: 100vh;
  background: var(--el-bg-color-page);

  .main-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }
}
</style>