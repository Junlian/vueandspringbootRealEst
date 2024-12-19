export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  features: string[];
  type: 'sale' | 'rent';
}

export interface SearchCriteria {
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  type?: 'sale' | 'rent';
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}