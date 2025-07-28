import api from '@/lib/axios'
import type { Listing } from '@/types/listing'

export async function fetchListings(): Promise<Listing[]> {
  const response = await api.get('/listings')
  return response.data
}
