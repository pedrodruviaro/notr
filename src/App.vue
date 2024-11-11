<script setup lang="ts">
import { useNotesStore } from '@/stores/notes'
import { onMounted } from 'vue'
import { useCategoriesStore } from './stores/categories'
import LayoutPage from '@/layouts/Page.vue'

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()

onMounted(() => {
  notesStore.getNotes()
  categoriesStore.getCategories()
})
</script>

<template>
  <div class="overflow-x-hidden">
    <LayoutPage>
      <RouterView v-slot="{ Component }">
        <Transition name="page-transition" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </LayoutPage>
  </div>
</template>

<style scoped>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.35s ease;
}

.page-transition-enter-from {
  transform: translateX(100%);
  opacity: 0.5;
}

.page-transition-leave-to {
  transform: translateX(-100%);
  opacity: 1;
}
</style>
