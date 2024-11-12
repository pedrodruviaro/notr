<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  id: string
  color: string
  content: string
  createdAt: Date
  category: string | undefined
}>()

const emits = defineEmits<{
  edit: [id: string]
  remove: [id: string]
  detail: [id: string]
}>()
</script>

<template>
  <article
    class="overflow-hidden rounded-lg border border-neutral-900 p-4 lg:p-6"
    :style="{ backgroundColor: props.color }"
  >
    <div class="flex items-center justify-between">
      <span class="mb-2 inline-block text-sm text-neutral-600">{{
        props.createdAt.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      }}</span>

      <button class="p-1 text-neutral-600 hover:opacity-70" @click="emits('detail', props.id)">
        <Icon icon="mdi:arrow-top-right" class="h-6 w-6" />
      </button>
    </div>

    <p class="max-w-max truncate">{{ props.content }}</p>

    <div class="mt-10 flex flex-wrap justify-end gap-4">
      <p class="flex-1 text-sm font-bold" v-if="props.category">{{ props.category }}</p>

      <div class="flex gap-2">
        <button @click="emits('edit', props.id)" class="text-sm text-neutral-800">Editar</button>
        <button @click="emits('remove', props.id)" class="text-sm text-neutral-800">Remover</button>
      </div>
    </div>
  </article>
</template>
