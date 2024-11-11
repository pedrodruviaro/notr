<script setup lang="ts">
const props = defineProps<{
  id: string
  color: string
  content: string
  createdAt: Date
}>()
</script>

<template>
  <article
    class="rounded-lg border border-neutral-900 p-4 lg:p-6"
    :style="{ backgroundColor: props.color }"
  >
    <span class="mb-2 inline-block text-sm text-neutral-600">{{
      new Date(props.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    }}</span>
    <p>{{ props.content }}</p>
  </article>
</template>
