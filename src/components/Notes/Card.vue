<script setup lang="ts">
const props = defineProps<{
  id: string
  color: string
  content: string
  createdAt: Date
}>()

const emits = defineEmits<{
  edit: [id: string]
  remove: [id: string]
}>()
</script>

<template>
  <article
    class="rounded-lg border border-neutral-900 p-4 lg:p-6"
    :style="{ backgroundColor: props.color }"
  >
    <span class="mb-2 inline-block text-sm text-neutral-600">{{
      props.createdAt.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    }}</span>
    <p>{{ props.content }}</p>

    <div class="mt-10 flex gap-4">
      <button @click="emits('edit', props.id)">Editar</button>
      <button @click="emits('remove', props.id)">Remover</button>
    </div>
  </article>
</template>
