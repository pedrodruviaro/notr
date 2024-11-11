<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  color: string
  content: string
  createdAt: Date
  category: string | undefined
}>()

const decorationColor = computed(() => {
  return props.color || '#171717'
})
</script>

<template>
  <div class="relative grid">
    <article class="z-10 block rounded-xl border border-neutral-900 bg-neutral-50 p-4 lg:p-6">
      <span class="mb-4 inline-block text-sm text-neutral-600 lg:mb-6">{{
        props.createdAt.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      }}</span>
      <p class="whitespace-pre-wrap">
        {{ props.content }}
      </p>
    </article>

    <div
      class="absolute -bottom-2 -right-2 block h-full w-full rounded-xl lg:-bottom-3 lg:-right-3"
      :style="{ backgroundColor: decorationColor }"
    ></div>
  </div>
</template>
