<script setup lang="ts">
import BaseButton from '@/components/Base/Button.vue'
import { useCategoriesStore } from '@/stores/categories'
import { noteColors, type NoteFormData } from '@/types/types'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { z } from 'zod'
import type { ZodFormattedError } from 'zod'

const schema = z.object({
  category: z.string().optional(),
  color: z.string({ message: 'Escolha uma cor' }),
  content: z.string().min(2, 'Insira um conteúdo'),
})

const props = defineProps<{
  buttonLabel: string
}>()

const emits = defineEmits<{
  submited: []
}>()

const { categories } = storeToRefs(useCategoriesStore())

const model = defineModel<NoteFormData>({ required: true })

const errors = ref<ZodFormattedError<NoteFormData>>()

const handleSubmit = () => {
  const result = schema.safeParse({ ...model.value })

  if (!result.success) {
    errors.value = result.error.format()
    return
  }

  errors.value = undefined
  emits('submited')
}
</script>

<template>
  <div class="grid max-w-max">
    <span class="mb-1 inline-block">Categoria</span>
    <select class="rounded-lg border border-zinc-900 px-4 py-2.5" v-model="model.category">
      <option value="">Nenhuma</option>
      <option v-for="category in categories" :key="category.id" :value="category.title">
        {{ category.title }}
      </option>
    </select>
  </div>

  <div class="flex flex-wrap gap-2">
    <button
      class="rounded-full"
      v-for="color in noteColors"
      :key="color"
      :class="{ 'outline outline-2 outline-neutral-400': model.color === color }"
      @click="model.color = color"
    >
      <span class="block aspect-square w-8 rounded-full" :style="{ backgroundColor: color }">
      </span>
    </button>
  </div>

  <div>
    <textarea
      v-model="model.content"
      class="w-full resize-none rounded-xl border border-neutral-900 p-4 text-lg outline-none"
      :style="{ backgroundColor: model.color }"
      :rows="9"
    ></textarea>

    <span class="text-red-400" v-if="errors?.content?._errors">{{
      errors.content._errors[0]
    }}</span>
  </div>

  <div class="flex justify-end">
    <BaseButton :label="props.buttonLabel" variant="outline" @click="handleSubmit" />
  </div>
</template>
