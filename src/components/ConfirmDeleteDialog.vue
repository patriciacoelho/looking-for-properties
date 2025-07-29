<!-- components/ConfirmDeleteDialog.vue -->
<template>
  <AlertDialogRoot v-model:open="modelValue">
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <AlertDialogContent
        class="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl space-y-4"
      >
        <AlertDialogTitle class="text-lg font-bold">Delete record?</AlertDialogTitle>
        <AlertDialogDescription class="text-sm text-gray-500">
          This action is irreversible. Are you sure you want to proceed?
        </AlertDialogDescription>

        <div class="flex justify-end gap-2">
          <AlertDialogCancel class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            class="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
            @click="emit('confirm')"
          >
            Excluir
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import {
  AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from 'radix-vue'

const modelValue = defineModel<boolean>('open')
const emit = defineEmits(['confirm'])
</script>
