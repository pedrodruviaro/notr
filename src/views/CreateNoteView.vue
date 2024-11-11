<script setup lang="ts">
import LayoutPage from '@/layouts/Page.vue'
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import { noteColors } from '@/types/types'
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'

const selectedColor = ref<(typeof noteColors)[number]>(noteColors[0])
const content = ref('')
const category = ref()

const notesStore = useNotesStore()

const CAT = ['work', 'life', 'fitness']

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
  <LayoutPage>
    <section class="space-y-8">
      <BaseTitle label="Crie sua nota" />

      <div>
        <select class="border p-2" v-model="category">
          <option value="">Nenhuma</option>
          <option v-for="c in CAT" :key="c" :value="c">{{ c }}</option>
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
  </LayoutPage>
</template>
