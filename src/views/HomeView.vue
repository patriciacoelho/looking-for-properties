<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ListingTable from '@/components/ListingTable.vue'
import ListingFormModal from '@/components/ListingFormModal.vue'
import { useListingsStore } from '@/stores/listings'
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog.vue'

const store = useListingsStore()

const showModal = ref(false)
const isEditing = ref(false)
const editingListingId = ref<number | null>(null)

const showDeleteDialog = ref(false)
const listingToDelete = ref<number | null>(null)

onMounted(async () => {
  await store.fetchListings()
})

const listings = computed(() => store.filteredAndSortedListings)

const openCreateModal = () => {
  isEditing.value = false
  editingListingId.value = null
  showModal.value = true
}

const openEditModal = (id: number) => {
  isEditing.value = true
  editingListingId.value = id
  showModal.value = true
}

const handleSubmit = (form: any) => {
  console.log(form)
  if (isEditing.value && editingListingId.value !== null) {
    store.updateListing({ id: editingListingId.value, ...form })
  } else {
    store.addListing(form)
  }
  showModal.value = false
}

const handleDelete = (id: number) => {
  listingToDelete.value = id
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  if (listingToDelete.value !== null) {
    store.deleteListing(listingToDelete.value)
    listingToDelete.value = null
  }
  showDeleteDialog.value = false
}
</script>

<template>
  <main>
    <h1 class="text-2xl mb-6">Property Listings</h1>

    <div class="mb-4 flex flex-wrap items-center gap-4">
      <button
        @click="openCreateModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer"
      >
        + Add Listing
      </button>

      <select
        v-model="store.filters.status"
        class="border border-gray-300 dark:border-gray-600 px-2 py-2 rounded text-sm"
      >
        <option value="">All Statuses</option>
        <option value="available">Available</option>
        <option value="under_contract">Under Contract</option>
        <option value="sold">Sold</option>
      </select>

      <button
        @click="store.toggleSortOrder"
        class="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-2 rounded cursor-pointer"
      >
        Sort: {{ store.sortOrder === 'asc' ? 'Price ↑' : 'Price ↓' }}
      </button>
    </div>

    <div v-if="store.loading">Loading...</div>
    <div v-else-if="store.error">{{ store.error }}</div>
    <ListingTable v-else :listings="listings" @edit="openEditModal" @delete="handleDelete" />

    <ListingFormModal
      v-if="showModal"
      :show="showModal"
      :is-editing="isEditing"
      :editing-id="editingListingId"
      @close="showModal = false"
      @submit="handleSubmit"
    />

    <ConfirmDeleteDialog v-model:open="showDeleteDialog" @confirm="confirmDelete" />
  </main>
</template>

<style scoped></style>
