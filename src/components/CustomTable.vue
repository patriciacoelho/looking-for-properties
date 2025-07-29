<script setup lang="ts" generic="T">
import type { Column } from '@/types/table'
import { computed, useSlots } from 'vue'

defineProps<{
  columns: Column<T>[]
  data: T[]
}>()

const slots = useSlots()

const hasActions = computed(() => !!slots['cell-actions'])
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-400">
      <thead class="text-sm text-left">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key as string"
            class="px-4 py-3 font-medium text-gray-700"
          >
            {{ col.label }}
          </th>

          <th v-if="hasActions" class="px-4 py-3 font-medium text-gray-700 text-right">Actions</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-100 text-sm">
        <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="hover:bg-gray-300/10">
          <td v-for="col in columns" :key="col.key" class="px-4 py-2 whitespace-nowrap">
            <slot :name="`cell-${col.key as string}`" :value="row[col.key]" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>

          <td v-if="hasActions" class="px-4 py-2 whitespace-nowrap text-right">
            <slot name="cell-actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
