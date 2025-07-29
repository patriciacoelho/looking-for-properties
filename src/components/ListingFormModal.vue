<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useListingsStore } from '@/stores/listings'
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue'

const props = defineProps<{
  show: boolean
  isEditing: boolean
  editingId: number | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (
    e: 'submit',
    form: {
      address: string
      price: number
      description: string
      status: string
    },
  ): void
}>()

const store = useListingsStore()

const open = ref(props.show)

watch(
  () => props.show,
  (val) => {
    open.value = val
  },
)

watch(open, (val) => {
  if (!val) {
    emit('close')
    resetForm()
  }
})

const form = ref({
  address: '',
  price: 0,
  description: '',
  status: 'available',
})

const title = computed(() => (props.isEditing ? 'Edit Listing' : 'Add Listing'))

watch(
  () => props.editingId,
  (id) => {
    if (props.isEditing && id != null) {
      const existing = store.listings.find((l) => l.id === id)
      if (existing) {
        form.value = {
          address: existing.address,
          price: existing.price,
          description: existing.description,
          status: existing.status,
        }
      }
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

function resetForm() {
  form.value = {
    address: '',
    price: 0,
    description: '',
    status: 'available',
  }
}

function handleSubmit() {
  emit('submit', { ...form.value })
  open.value = false
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <Transition name="fade">
        <DialogOverlay
          v-if="open"
          class="fixed inset-0 z-40 bg-black/50 data-[state=closed]:animate-fadeOut data-[state=open]:animate-fadeIn"
        />
      </Transition>

      <Transition name="scale">
        <DialogContent
          v-if="open"
          class="fixed z-50 left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl data-[state=open]:animate-zoomIn data-[state=closed]:animate-zoomOut"
        >
          <DialogTitle class="text-xl font-semibold mb-4">
            {{ title }}
          </DialogTitle>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Address</label>
              <input
                v-model="form.address"
                required
                class="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Price</label>
              <input
                v-model.number="form.price"
                required
                type="number"
                class="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Description</label>
              <textarea
                v-model="form.description"
                required
                class="w-full border rounded px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Status</label>
              <select
                v-model="form.status"
                required
                class="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="available">Available</option>
                <option value="under_contract">Under Contract</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div class="flex justify-end gap-2 pt-4">
              <DialogClose as="button" class="text-gray-500 text-sm px-3 cursor-pointer"
                >Cancel</DialogClose
              >
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
              >
                {{ isEditing ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
