<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { onMounted } from 'vue'

const notesStore = useNotesStore()
onMounted(() => notesStore.getNotes())
</script>

<template>
  <RouterView />
</template>
