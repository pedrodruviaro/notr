import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import type { Note } from '@/types/entities'

const STORAGE_KEY = 'notes-notr'

export const useNotesStore = defineStore('notes', () => {
  const toast = useToast()

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
    notes.value.unshift(newNote)

    toast.success('Nota criada!', { duration: 2000, position: 'top-right' })
  }

  const getNotes = () => {
    const localNotes = localStorage.getItem(STORAGE_KEY)
    if (!localNotes) return

    const arr = JSON.parse(localNotes).map((note: Note) => ({
      ...note,
      createdAt: new Date(note.createdAt),
    }))

    arr.sort((a: Note, b: Note) => b.createdAt.getTime() - a.createdAt.getTime())

    notes.value = arr
  }

  const remove = (id: string) => {
    const idx = notes.value.findIndex((n) => n.id === id)
    notes.value.splice(idx, 1)

    if (notes.value.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value]))

    toast.info('Nota removida!', { duration: 2000, position: 'top-right' })
  }

  const editNote = (
    id: string,
    { color, content, category }: Pick<Note, 'color' | 'content' | 'category'>,
  ) => {
    const updatedNote: Omit<Note, 'id'> = {
      color,
      content,
      category,
      createdAt: new Date(),
    }

    const idx = notes.value.findIndex((n) => n.id === id)
    const currentId = notes.value[idx].id
    notes.value.splice(idx, 1, { ...updatedNote, id: currentId })

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value]))

    toast.success('Nota atualizada!', { duration: 2000, position: 'top-right' })
  }

  const getNoteById = (id: string) => {
    return notes.value.find((n) => n.id === id)
  }

  const removeCategory = (category: string) => {
    notes.value.forEach((note) => {
      if (note.category && note.category === category) {
        note.category = ''
      }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value]))
  }

  const editCategory = (oldValue: string, newValue: string) => {
    notes.value.forEach((note) => {
      if (note.category && note.category === oldValue) {
        note.category = newValue
      }
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...notes.value]))
  }

  return {
    notes,
    create,
    getNotes,
    remove,
    editNote,
    getNoteById,
    removeCategory,
    editCategory,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotesStore, import.meta.hot))
}
