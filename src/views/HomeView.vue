<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import BaseConfirmDialog from '@/components/Base/ConfirmDialog.vue'
import NotesList from '@/components/Notes/List/List.vue'
import NotesCard from '@/components/Notes/List/Card.vue'
import NotesEmpty from '@/components/Notes/List/Empty.vue'
import { useRouter } from 'vue-router'
import { useNotesStore } from '@/stores/notes'
import { useCategoriesStore } from '@/stores/categories'
import { computed, ref } from 'vue'
import type { Note } from '@/types/entities'

const router = useRouter()

// Notes
const notesStore = useNotesStore()

const handleEditNote = (id: string) => router.push(`/edit/${id}`)

const handleMoveToDetail = (id: string) => router.push(`/notes/${id}`)

const isDialogOpen = ref(false)
const noteToRemove = ref<Note>()

const handleAskToRemove = (note: Note) => {
  noteToRemove.value = note
  isDialogOpen.value = true
}

const handleConfirmRemove = () => {
  if (!noteToRemove.value) return

  notesStore.remove(noteToRemove.value.id)
  isDialogOpen.value = false
  noteToRemove.value = undefined
}

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
  <div>
    <section class="mb-10 lg:mb-14">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <BaseTitle label="Minhas notas" />
        <BaseButton label="Nova nota" link to="/create" />
      </div>

      <div class="mt-8 flex flex-wrap gap-2">
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
      <NotesList v-auto-animate v-if="filteredNotes.length > 0">
        <NotesCard
          v-for="note in filteredNotes"
          :key="note.id"
          :id="note.id"
          :color="note.color"
          :content="note.content"
          :createdAt="new Date(note.createdAt)"
          :category="note.category"
          @edit="handleEditNote"
          @remove="handleAskToRemove(note)"
          @detail="handleMoveToDetail"
        />
      </NotesList>
      <NotesEmpty v-else />
    </section>

    <BaseConfirmDialog
      v-model="isDialogOpen"
      :loading="false"
      label="Deseja realmente apagar essa nota?"
      @confirm="handleConfirmRemove"
    />
  </div>
</template>
