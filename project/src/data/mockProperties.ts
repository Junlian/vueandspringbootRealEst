import type { Property } from '@/types/property'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic city views',
    price: 1250000,
    location: 'Downtown Manhattan',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    features: ['3 Bedrooms', '3.5 Bathrooms', 'Private Terrace', 'Concierge'],
    type: 'sale'
  },
  {
    id: '2',
    title: 'Modern Beach House',
    description: 'Contemporary beachfront property',
    price: 2750000,
    location: 'Malibu Beach',
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
    features: ['4 Bedrooms', 'Private Beach Access', 'Infinity Pool', 'Smart Home'],
    type: 'sale'
  },
  {
    id: '3',
    title: 'Cozy Mountain Cabin',
    description: 'Rustic cabin with modern amenities',
    price: 450000,
    location: 'Aspen',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233',
    features: ['2 Bedrooms', 'Fireplace', 'Hot Tub', 'Mountain View'],
    type: 'sale'
  },
  {
    id: '4',
    title: 'Urban Loft Apartment',
    description: 'Industrial-style loft in arts district',
    price: 875000,
    location: 'Brooklyn',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    features: ['Open Floor Plan', 'High Ceilings', 'Exposed Brick', 'Chef\'s Kitchen'],
    type: 'sale'
  }
]