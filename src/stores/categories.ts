import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useNotesStore } from './notes'
import { useToast } from 'vue-toast-notification'
import type { Category } from '@/types/entities'
import { MOCK_CATEGORIES } from '@/data/mocks'

const STORAGE_KEY = 'categories-notr'

export const useCategoriesStore = defineStore('categories', () => {
  const toast = useToast()
  const notesStore = useNotesStore()

  const categories = ref<Category[]>([])

  const getCategories = () => {
    const localCategories = localStorage.getItem(STORAGE_KEY)
    if (!localCategories) return

    categories.value = JSON.parse(localCategories)
  }

  const create = ({ title }: Pick<Category, 'title'>) => {
    const newCategory = {
      id: uuidv4(),
      title,
    }

    categories.value.unshift(newCategory)
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...categories.value]))

    toast.success('Categoria criada!', { duration: 2000, position: 'top-right' })
  }

  const remove = (id: string) => {
    const idx = categories.value.findIndex((c) => c.id === id)
    const catToRemove = categories.value[idx].title

    categories.value.splice(idx, 1)

    if (categories.value.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      return
    }

    notesStore.removeCategory(catToRemove)

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...categories.value]))

    toast.info('Categoria removida!', { duration: 2000, position: 'top-right' })
  }

  const edit = (id: string, { title }: Pick<Category, 'title'>) => {
    const idx = categories.value.findIndex((c) => c.id === id)

    const localCategory = categories.value[idx]

    categories.value.splice(idx, 1, { id: localCategory.id, title })

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...categories.value]))

    notesStore.editCategory(localCategory.title, title)

    toast.success('Categoria atualizada!', { duration: 2000, position: 'top-right' })
  }

  const mockData = () => {
    const hasCategories = localStorage.getItem(STORAGE_KEY)
    if (hasCategories) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...JSON.parse(hasCategories), ...MOCK_CATEGORIES]),
      )

      categories.value = [...categories.value, ...MOCK_CATEGORIES]
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...MOCK_CATEGORIES]))
      categories.value = [...MOCK_CATEGORIES]
    }
  }

  return {
    categories,
    getCategories,
    create,
    remove,
    edit,
    mockData,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}
