<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import { noteColors, type NoteFormData } from '@/types/types'
import { ref } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { useRouter } from 'vue-router'
import { useHead } from 'unhead'
import NotesForm from '@/components/Notes/Form.vue'

useHead({
  title: 'Criar - Not.r',
})

const state = ref<NoteFormData>({
  color: noteColors[0],
  content: '',
  category: '',
})

const notesStore = useNotesStore()
const router = useRouter()

const handleCreateNote = () => {
  notesStore.create({
    color: state.value.color,
    content: state.value.content,
    category: state.value.category,
  })
  router.push('/')
}
</script>

<template>
  <div>
    <section class="space-y-8">
      <BaseTitle label="Crie sua nota" />
      <NotesForm button-label="Pronto!" v-model="state" @submited="handleCreateNote" />
    </section>
  </div>
</template>
