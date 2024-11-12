<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import { noteColors, type NoteFormData } from '@/types/types'
import { computed, onMounted, ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRoute } from 'vue-router'
import { useHead } from 'unhead'
import NotesForm from '@/components/Notes/Form.vue'

useHead({
  title: 'Editar - Not.r',
})

const route = useRoute()
const notedId = computed(() => route.params.id as string)

const notesStore = useNotesStore()

const state = ref<NoteFormData>({
  color: noteColors[0],
  content: '',
  category: '',
})

onMounted(() => {
  const noteToEdit = notesStore.getNoteById(notedId.value)
  if (noteToEdit) {
    state.value.category = noteToEdit.category ?? ''
    state.value.color = noteToEdit.color
    state.value.content = noteToEdit.content
  }
})

const handleEditNote = () => {
  notesStore.editNote(notedId.value, {
    color: state.value.color,
    content: state.value.content,
    category: state.value.category,
  })
}
</script>

<template>
  <div>
    <section class="space-y-8">
      <BaseTitle label="Edite a sua nota" />

      <NotesForm button-label="Salvar!" v-model="state" @submited="handleEditNote" />
    </section>
  </div>
</template>
