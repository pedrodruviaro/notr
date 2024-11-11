<script setup lang="ts">
import { Icon } from '@iconify/vue'

type Variant = 'solid' | 'ghost' | 'outline'

type VariantClasses = {
  [key in Variant]: string
}

const props = withDefaults(
  defineProps<{
    label?: string
    link?: boolean
    to?: string | object
    block?: boolean
    variant?: Variant
    loading?: boolean
  }>(),
  {
    to: '/',
    block: false,
    variant: 'solid',
    loading: false,
  },
)

const variantClasses: VariantClasses = {
  solid: 'border border-neutral-900 bg-primary hover:brightness-95',
  ghost: 'hover:bg-neutral-100',
  outline: 'border border-neutral-900 hover:bg-neutral-100 hover:border-neutral-700',
}
</script>

<template>
  <RouterLink
    v-if="props.link"
    :to="props.to"
    class="button"
    :class="[
      {
        'w-full': props.block,
        'max-w-max': !props.block,
        'cursor-not-allowed opacity-80': props.loading,
        'cursor-pointer': !props.loading,
      },
      variantClasses[props.variant],
    ]"
    :disabled="props.loading"
  >
    <template v-if="props.label">
      {{ props.label }}
    </template>

    <slot v-else />
    <Icon icon="mdi:loading" class="animate-spin" v-if="props.loading" />
  </RouterLink>

  <button
    class="button"
    :class="[
      {
        'w-full': props.block,
        'max-w-max': !props.block,
        'cursor-not-allowed opacity-80': props.loading,
        'cursor-pointer': !props.loading,
      },
      variantClasses[props.variant],
    ]"
    :disabled="props.loading"
    v-else
  >
    <template v-if="props.label">
      {{ props.label }}
    </template>

    <slot v-else />

    <Icon icon="mdi:loading" class="animate-spin" v-if="props.loading" />
  </button>
</template>

<style scoped>
.button {
  @apply flex items-center justify-center gap-2 rounded-lg px-5 py-1.5 text-center;
}
</style>
