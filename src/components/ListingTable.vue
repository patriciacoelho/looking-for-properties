<script setup lang="ts">
import CustomTable from './CustomTable.vue'
import CustomBadge from './CustomBadge.vue'
import type { Listing } from '@/types/listing'

defineProps<{
  listings: Listing[]
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
    case 'pending':
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
  </CustomTable>
</template>
