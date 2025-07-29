import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Listing } from '@/types/listing'
import {
  fetchListings as fetchListingsService,
  addListing as addListingService,
  updateListing as updateListingService,
  deleteListing as deleteListingService,
} from '@/api/listings'

export const useListingsStore = defineStore('listings', () => {
  const listings = ref<Listing[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const filters = ref({ status: '' })
  const sortOrder = ref<'asc' | 'desc'>('asc')

  const fetchListings = async () => {
    loading.value = true
    error.value = null
    try {
      listings.value = await fetchListingsService()
    } catch {
      error.value = 'Failed to load listings'
    } finally {
      loading.value = false
    }
  }

  const addListing = async (listing: Omit<Listing, 'id'>) => {
    const newListing = await addListingService(listing)
    listings.value.push(newListing)
  }

  const updateListing = async (updated: Listing) => {
    await updateListingService(updated)
    const index = listings.value.findIndex((l) => l.id === updated.id)
    if (index !== -1) {
      listings.value[index] = { ...listings.value[index], ...updated }
    }
  }

  const deleteListing = async (id: number) => {
    await deleteListingService(id)
    listings.value = listings.value.filter((l) => l.id !== id)
  }

  const toggleSortOrder = () => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  const filteredAndSortedListings = computed(() => {
    let result = [...listings.value]
    if (filters.value.status) {
      result = result.filter((l) => l.status === filters.value.status)
    }
    return result.sort((a, b) =>
      sortOrder.value === 'asc' ? a.price - b.price : b.price - a.price,
    )
  })

  return {
    listings,
    loading,
    error,
    filters,
    sortOrder,
    fetchListings,
    addListing,
    updateListing,
    deleteListing,
    toggleSortOrder,
    filteredAndSortedListings,
  }
})
