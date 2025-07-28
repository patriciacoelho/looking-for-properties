<script lang="ts" setup>
type Variant = 'green' | 'yellow' | 'blue'

const props = withDefaults(
  defineProps<{
    variant?: Variant
  }>(),
  {
    variant: 'blue',
  },
)

const variantClasses: Record<Variant, string> = {
  green: 'bg-green-200 text-green-800',
  yellow: 'bg-yellow-200 text-yellow-800',
  blue: 'bg-blue-200 text-blue-800',
}
</script>

<template>
  <span
    :class="`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variantClasses[props.variant]}`"
  >
    <slot />
  </span>
</template>
