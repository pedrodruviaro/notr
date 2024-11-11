import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Category } from '@/types/entities'

const STORAGE_KEY = 'categories-notr'

export const useCategoriesStore = defineStore('categories', () => {
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
  }

  const remove = (id: string) => {
    const idx = categories.value.findIndex((c) => c.id === id)
    if (!idx) return

    categories.value.splice(idx, 1)

    if (categories.value.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
      return
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify([...categories.value]))
  }

  const edit = (id: string, { title }: Pick<Category, 'title'>) => {
    const idx = categories.value.findIndex((c) => c.id === id)
    if (!idx) return

    const localId = categories.value[idx].id
    categories.value.splice(idx, 1, { id: localId, title })
  }

  return {
    categories,
    getCategories,
    create,
    remove,
    edit,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}
