<script setup lang="ts">
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
}>()
</script>

<template>
  <article
    class="overflow-hidden rounded-lg border border-neutral-900 p-4 lg:p-6"
    :style="{ backgroundColor: props.color }"
  >
    <p class="text-sm font-bold" v-if="props.category">{{ props.category }}</p>

    <span class="mb-2 inline-block text-sm text-neutral-600">{{
      props.createdAt.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    }}</span>

    <p class="max-w-max truncate">{{ props.content }}</p>

    <div class="mt-10 flex justify-end gap-4">
      <button @click="emits('edit', props.id)" class="text-sm text-neutral-800">Editar</button>
      <button @click="emits('remove', props.id)" class="text-sm text-neutral-800">Remover</button>
    </div>
  </article>
</template>
