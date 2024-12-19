<script setup lang="ts">
import { ref } from 'vue'
import PropertyCard from '@/components/property/PropertyCard.vue'
import { usePropertySearch } from '@/composables/usePropertySearch'
import type { SearchCriteria } from '@/types/property'

const { properties, loading, error, search } = usePropertySearch()
const searchCriteria = ref<SearchCriteria>({})

function handleSearch() {
  search(searchCriteria.value)
}

function handleFavorite(id: string) {
  console.log('Favorite property:', id)
}

function handleViewDetails(id: string) {
  console.log('View details:', id)
}
</script>

<template>
  <div class="property-listing">
    <div class="header">
      <h1>Available Properties</h1>
      <el-form :inline="true" :model="searchCriteria" class="search-form">
        <el-form-item label="Location">
          <el-input 
            v-model="searchCriteria.location" 
            placeholder="Enter location"
          />
        </el-form-item>
        <el-form-item label="Type">
          <el-select v-model="searchCriteria.type" placeholder="Select type">
            <el-option label="Sale" value="sale" />
            <el-option label="Rent" value="rent" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">Search</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      class="error-alert"
    />
    
    <div v-if="loading" class="loading">
      <el-skeleton :rows="3" animated />
      <el-skeleton :rows="3" animated />
      <el-skeleton :rows="3" animated />
    </div>

    <div v-else class="property-grid">
      <PropertyCard
        v-for="property in properties"
        :key="property.id"
        :property="property"
        @favorite="handleFavorite"
        @view-details="handleViewDetails"
      />
    </div>

    <div v-if="!loading && !error && properties.length === 0" class="no-results">
      <el-empty description="No properties found" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.property-listing {
  padding: 2rem;

  .header {
    margin-bottom: 2rem;

    h1 {
      margin-bottom: 1rem;
      color: var(--el-text-color-primary);
    }

    .search-form {
      background: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: var(--el-box-shadow-light);
    }
  }

  .error-alert {
    margin-bottom: 2rem;
  }

  .property-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .loading {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .no-results {
    margin-top: 4rem;
    text-align: center;
  }
}
</style>