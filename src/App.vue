<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { onMounted } from 'vue'
import { useCategoriesStore } from './stores/categories'

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()

onMounted(() => {
  notesStore.getNotes()
  categoriesStore.getCategories()
})
</script>

<template>
  <RouterView />
</template>
