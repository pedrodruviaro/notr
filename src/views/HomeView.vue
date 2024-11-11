<script setup lang="ts">
import LayoutPage from '@/layouts/Page.vue'
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import NotesList from '@/components/Notes/List.vue'
import NotesCard from '@/components/Notes/Card.vue'
import NotesEmpty from '@/components/Notes/Empty.vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { useCategoriesStore } from '@/stores/categories'
import { computed, ref } from 'vue'

const router = useRouter()

// Notes
const notesStore = useNotesStore()

const handleEditNote = (id: string) => router.push(`/edit/${id}`)
const handleRemoveNote = (id: string) => notesStore.remove(id)

// Categories
const categoriesStore = useCategoriesStore()
const seletecFilter = ref<undefined | string>(undefined)

// Both
const filteredNotes = computed(() => {
  if (!seletecFilter.value) return notesStore.notes
  return notesStore.notes.filter((n) => n.category?.toLowerCase() === seletecFilter.value)
})
</script>

<template>
  <LayoutPage>
    <section class="mb-10 lg:mb-14">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <BaseTitle label="Minhas notas" />
        <BaseButton label="Nova nota" link to="/create" />
      </div>

      <div class="mt-8 flex gap-2">
        <BaseButton
          label="todas"
          :variant="seletecFilter === undefined ? 'solid' : 'outline'"
          @click="seletecFilter = undefined"
        />
        <BaseButton
          v-for="category in categoriesStore.categories"
          :key="category.id"
          :label="category.title"
          :variant="seletecFilter === category.title ? 'solid' : 'outline'"
          @click="seletecFilter = category.title"
        />
      </div>
    </section>

    <section>
      <NotesList v-if="filteredNotes.length > 0">
        <NotesCard
          v-for="note in filteredNotes"
          :key="note.id"
          :id="note.id"
          :color="note.color"
          :content="note.content"
          :createdAt="new Date(note.createdAt)"
          :category="note.category"
          @edit="handleEditNote"
          @remove="handleRemoveNote"
        />
      </NotesList>
      <NotesEmpty v-else />
    </section>
  </LayoutPage>
</template>
