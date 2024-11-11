<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string
  }>(),
  { as: 'div' },
)
</script>

<template>
  <Component :is="props.as" class="mx-auto block max-w-5xl px-4 lg:px-6">
    <slot />
  </Component>
</template>
