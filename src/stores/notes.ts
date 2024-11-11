import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import type { Note } from '@/types/entities'

const STORAGE_KEY = 'notes-notr'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  const create = ({ color, content, category }: Pick<Note, 'color' | 'content' | 'category'>) => {
    const newNote: Note = {
      id: uuidv4(),
      color,
      content,
      category,
      createdAt: new Date(),
    }

    if (notes.value.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newNote]))
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value, newNote]))
  }

  const getNotes = () => {
    const localNotes = localStorage.getItem(STORAGE_KEY)
    if (!localNotes) return

    notes.value = JSON.parse(localNotes)
  }

  const remove = (id: string) => {
    const idx = notes.value.findIndex((n) => n.id === id)
    notes.value.splice(idx, 1)

    if (notes.value.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value]))
  }

  const editNote = () => {
    // atualizar no array
    // atualiza no LS
  }

  return {
    notes,
    create,
    getNotes,
    remove,
    editNote,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
