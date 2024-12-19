import { ref, onMounted } from 'vue'
import { usePropertyStore } from '@/stores/propertyStore'
import type { SearchCriteria } from '@/types/property'

export function usePropertySearch() {
  const store = usePropertyStore()
  const searchCriteria = ref<SearchCriteria>({
    page: 0,
    size: 12,
    sortBy: 'price',
    sortDirection: 'asc'
  })

  const search = async (criteria?: SearchCriteria) => {
    if (criteria) {
      searchCriteria.value = { ...searchCriteria.value, ...criteria }
    }
    await store.searchProperties(searchCriteria.value)
  }

  onMounted(() => {
    search()
  })

  return {
    properties: store.properties,
    loading: store.loading,
    error: store.error,
    search,
    searchCriteria
  }
}