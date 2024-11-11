import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import type { Note } from '@/types/entities'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  return {
    notes,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
