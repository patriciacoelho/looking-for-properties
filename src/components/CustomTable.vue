<script setup lang="ts" generic="T">
import type { Column } from '@/types/table'
import { useSlots } from 'vue'

defineProps<{
  columns: Column<T>[]
  data: T[]
}>()

useSlots()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="min-w-full table-auto border-collapse">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key as string"
            class="border-b border-gray-200 p-4 pt-0 pb-3 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="border-b border-gray-200 dark:border-gray-700"
        >
          <td
            v-for="col in columns"
            :key="col.key as string"
            class="p-4 text-sm text-gray-700 dark:text-gray-300"
          >
            <slot :name="`cell-${String(col.key)}`" :value="row[col.key]" :row="row" :column="col">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
