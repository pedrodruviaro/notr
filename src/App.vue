<script setup lang="ts">
import LayoutPage from '@/layouts/Page.vue'
import LayoutBanner from '@/components/Layout/Banner.vue'
import { useNotesStore } from '@/stores/notes'
import { onMounted, ref } from 'vue'
import { useCategoriesStore } from './stores/categories'
import { createHead } from 'unhead'

createHead()

const notesStore = useNotesStore()
const categoriesStore = useCategoriesStore()

onMounted(() => {
  notesStore.getNotes()
  categoriesStore.getCategories()
})

const bannerRef = ref<InstanceType<typeof LayoutBanner> | null>(null)

const handleMockData = () => {
  categoriesStore.mockData()
  notesStore.mockData()

  bannerRef.value?.handleClose()
}
</script>

<template>
  <div class="overflow-x-hidden">
    <LayoutBanner ref="bannerRef" @action="handleMockData" />

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
