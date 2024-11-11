<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import { noteColors } from '@/types/types'
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { storeToRefs } from 'pinia'

const { categories } = storeToRefs(useCategoriesStore())

const selectedColor = ref<(typeof noteColors)[number]>(noteColors[0])
const content = ref('')
const category = ref('')

const notesStore = useNotesStore()

const router = useRouter()

const handleCreateNote = () => {
  notesStore.create({
    color: selectedColor.value,
    content: content.value,
    category: category.value,
  })
  router.push('/')
}
</script>

<template>
  <div>
    <section class="space-y-8">
      <BaseTitle label="Crie sua nota" />

      <div class="grid max-w-max">
        <span class="mb-1 inline-block">Categoria</span>
        <select class="rounded-lg border border-zinc-900 px-4 py-2.5" v-model="category">
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
          :class="{ 'outline outline-2 outline-neutral-400': selectedColor === color }"
          @click="selectedColor = color"
        >
          <span class="block aspect-square w-8 rounded-full" :style="{ backgroundColor: color }">
          </span>
        </button>
      </div>

      <div>
        <textarea
          v-model="content"
          class="w-full resize-none rounded-xl border border-neutral-900 p-4 text-lg outline-none"
          :style="{ backgroundColor: selectedColor }"
          :rows="15"
        ></textarea>
      </div>

      <div class="flex justify-end">
        <BaseButton label="Pronto!" variant="outline" @click="handleCreateNote" />
      </div>
    </section>
  </div>
</template>
