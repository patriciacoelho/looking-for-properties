import api from '@/lib/axios'
import type { Listing } from '@/types/listing'

export async function fetchListings(): Promise<Listing[]> {
  const response = await api.get('/listings')
  return response.data
}

export async function addListing(listing: Omit<Listing, 'id'>): Promise<Listing> {
  const response = await api.post('/listings', listing)
  return response.data
}

export async function updateListing(updated: Listing): Promise<void> {
  await api.put(`/listings/${updated.id}`, updated)
}

export async function deleteListing(id: number): Promise<void> {
  await api.delete(`/listings/${id}`)
}
