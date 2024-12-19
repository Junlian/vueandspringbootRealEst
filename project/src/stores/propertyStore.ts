import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Property, SearchCriteria } from '@/types/property'
import { propertyApi } from '@/services/api'

export const usePropertyStore = defineStore('property', () => {
  // State
  const properties = ref<Property[]>([])
  const selectedProperty = ref<Property | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  const searchProperties = async (criteria: SearchCriteria = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await propertyApi.search(criteria)
      properties.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch properties'
    } finally {
      loading.value = false
    }
  }

  const getPropertyById = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const data = await propertyApi.getById(id)
      selectedProperty.value = data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch property details'
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    properties,
    selectedProperty,
    loading,
    error,
    // Actions
    searchProperties,
    getPropertyById
  }
})