<script setup lang="ts">
import ListingTable from '@/components/ListingTable.vue'
import type { Listing } from '@/types/listing'

import { onMounted, ref } from 'vue'
import { fetchListings } from '@/api/listings'

const listings = ref<Listing[]>([])
const loading = ref(true)
const error = ref<null | string>(null)

onMounted(async () => {
  try {
    listings.value = await fetchListings()
  } catch (e) {
    error.value = 'Error'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main>
    <h1 class="text-2xl mb-6">Property Listings</h1>

    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ListingTable v-else :listings="listings" />
  </main>
</template>

<style scoped></style>
