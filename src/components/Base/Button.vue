<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

type Variant = 'solid' | 'ghost' | 'outline'

const props = withDefaults(
  defineProps<{
    label?: string
    to?: string | RouteRecordRaw
    block?: boolean
    variant?: Variant
    loading?: boolean
  }>(),
  {
    block: false,
    variant: 'solid',
    loading: false,
  },
)

const componentToRender = computed(() => (props.to ? RouterLink : 'button'))

const variantClasses = computed(() => ({
  solid: 'border border-neutral-900 bg-primary hover:brightness-95',
  ghost: 'hover:bg-neutral-100',
  outline: 'border border-neutral-900 hover:bg-neutral-100 hover:border-neutral-700',
}))

const customButtonClasses = computed(() => [
  {
    'w-full': props.block,
    'max-w-max': !props.block,
    'cursor-not-allowed opacity-80': props.loading,
    'cursor-pointer': !props.loading,
  },
  variantClasses.value[props.variant],
])
</script>

<template>
  <component
    :is="componentToRender"
    :to="props.to"
    class="flex items-center justify-center gap-2 rounded-lg px-5 py-1.5 text-center"
    :class="customButtonClasses"
    :disabled="props.loading"
  >
    <template v-if="props.label">
      {{ props.label }}
    </template>

    <slot v-else />

    <Icon icon="mdi:loading" class="animate-spin" v-if="props.loading" />
  </component>
</template>
