import axios from 'axios'
import type { SearchCriteria, Property } from '@/types/property'
import { Page } from '@/types/common'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '5000'),
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          break
        case 403:
          break
        case 404:
          break
      }
    }
    return Promise.reject(error)
  }
)

export const propertyApi = {
  search: async (criteria: SearchCriteria) => {
    try {
      const response = await api.get<Page<Property>>('/properties', { 
        params: {
          minPrice: criteria.minPrice,
          maxPrice: criteria.maxPrice,
          location: criteria.location,
          type: criteria.type,
          page: criteria.page || 0,
          size: criteria.size || 10,
          sortBy: criteria.sortBy || 'price',
          sortDirection: criteria.sortDirection || 'asc'
        }
      })
      return response.data.content;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },
  
  getById: async (id: string) => {
    try {
      const response = await api.get<Property>(`/properties/${id}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching property:', error);
      throw error;
    }
  }
}