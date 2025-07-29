<script setup lang="ts">
import { Pencil, Trash2 } from 'lucide-vue-next'
import CustomTable from './CustomTable.vue'
import CustomBadge from './CustomBadge.vue'
import type { Listing } from '@/types/listing'

defineProps<{
  listings: Listing[]
}>()

const emit = defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()

type ListingKey = keyof Listing
const columns: { label: string; key: ListingKey }[] = [
  { label: 'Address', key: 'address' },
  { label: 'Price', key: 'price' },
  { label: 'Description', key: 'description' },
  { label: 'Status', key: 'status' },
]

type Variant = 'green' | 'yellow' | 'blue'
const getBadgeVariant = (status: string): Variant => {
  switch (status.toLowerCase()) {
    case 'available':
      return 'green'
    case 'sold':
      return 'blue'
    case 'under_contract':
    default:
      return 'yellow'
  }
}

const snakeToTitleCase = (snake: string): string =>
  snake
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
</script>

<template>
  <CustomTable :columns="columns" :data="listings">
    <template #cell-status="{ value }">
      <CustomBadge :variant="getBadgeVariant(String(value))">
        {{ snakeToTitleCase(String(value)) }}
      </CustomBadge>
    </template>

    <template #cell-price="{ value }">
      {{ value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
    </template>

    <template #cell-actions="{ row }">
      <div class="flex gap-1 justify-end">
        <button
          @click="emit('edit', row.id)"
          class="flex p-3 justify-center text-gray-600 hover:bg-gray-300/50 rounded-full cursor-pointer"
        >
          <Pencil :size="16" />
        </button>
        <button
          @click="emit('delete', row.id)"
          class="flex p-3 justify-center text-red-600 hover:bg-red-300/50 rounded-full cursor-pointer"
        >
          <Trash2 :size="16" />
        </button>
      </div>
    </template>
  </CustomTable>
</template>
