<script setup lang="ts">
import { computed } from 'vue'
import type { Property } from '@/types/property'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps<{
  property: Property
}>()

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(props.property.price)
})

const emit = defineEmits<{
  (e: 'favorite', id: string): void
  (e: 'view-details', id: string): void
}>()
</script>

<template>
  <el-card class="property-card" :body-style="{ padding: '0px' }">
    <img :src="property.imageUrl" :alt="property.title" class="image">
    <div class="content">
      <h3>{{ property.title }}</h3>
      <p class="price">{{ formattedPrice }}</p>
      <p class="location">
        <el-icon><Location /></el-icon>
        {{ property.location }}
      </p>
      <p class="description">{{ property.description }}</p>
      <div class="features">
        <el-tag 
          v-for="feature in property.features" 
          :key="feature"
          size="small"
          class="feature"
        >
          {{ feature }}
        </el-tag>
      </div>
      <div class="actions">
        <el-button type="primary" @click="$emit('view-details', property.id)">
          View Details
        </el-button>
        <el-button @click="$emit('favorite', property.id)">
          <el-icon><Star /></el-icon>
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.property-card {
  height: 100%;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  .image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 1rem;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
    }

    .price {
      color: var(--el-color-primary);
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0.5rem 0;
    }

    .location {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--el-text-color-secondary);
      margin: 0.5rem 0;
    }

    .description {
      margin: 0.5rem 0;
      color: var(--el-text-color-regular);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;

      .feature {
        background: var(--el-color-primary-light-9);
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
    }
  }
}
</style>