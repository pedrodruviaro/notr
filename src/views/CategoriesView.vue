<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import BaseConfirmDialog from '@/components/Base/ConfirmDialog.vue'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useCategoriesStore } from '@/stores/categories'
import { useHead } from 'unhead'
import type { Category } from '@/types/entities'

useHead({
  title: 'Categorias - Not.r',
})

const categoriesStore = useCategoriesStore()

// Add
const categoryToEdit = ref<Category>()
const category = ref('')

const handleSetEdit = (cat: Category) => {
  categoryToEdit.value = cat
  category.value = cat.title
}

const handleCancelEdit = () => {
  categoryToEdit.value = undefined
  category.value = ''
}

const isEditing = computed(() => categoryToEdit.value)

const handleSubmit = () => {
  if (isEditing.value) {
    if (!categoryToEdit.value) return

    categoriesStore.edit(categoryToEdit.value.id, { title: category.value })
    categoryToEdit.value = undefined
    category.value = ''

    return
  }

  categoriesStore.create({ title: category.value })
  category.value = ''
}

// Remove
const categoryToRemove = ref<Category>()
const isDialogOpen = ref(false)

const handleWantsToRemove = (category: Category) => {
  categoryToRemove.value = category
  isDialogOpen.value = true
}

const handleConfirmRemove = () => {
  if (!categoryToRemove.value) return
  categoriesStore.remove(categoryToRemove.value.id)
  isDialogOpen.value = false
  categoryToRemove.value = undefined
}
</script>

<template>
  <div>
    <div class="space-y-10">
      <BaseTitle label="Minhas categorias" />

      <section>
        <form class="flex gap-2" @submit.prevent="handleSubmit">
          <input
            type="text"
            placeholder="Trabalho..."
            class="w-full rounded-lg border border-neutral-900 px-4 py-1.5"
            v-model="category"
          />
          <BaseButton
            v-if="isEditing"
            type="button"
            label="Cancelar"
            variant="outline"
            @click="handleCancelEdit"
          />
          <BaseButton type="submit" :label="isEditing ? 'Editar' : 'Salvar'" />
        </form>
      </section>

      <section>
        <ul class="grid gap-6">
          <li
            v-for="category in categoriesStore.categories"
            :key="category.id"
            class="flex flex-col gap-2 rounded-lg border border-neutral-200 p-2 md:flex-row md:items-center lg:px-4"
          >
            <p class="flex-1" :class="{ 'opacity-50': categoryToEdit?.title === category.title }">
              {{ category.title }}
            </p>

            <div class="flex justify-end gap-2">
              <button
                class="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="categoryToEdit?.title === category.title"
                aria-label="Editar"
                @click="handleSetEdit(category)"
              >
                <Icon icon="mdi:pencil" class="text-blue-400" />
              </button>

              <button
                class="rounded-lg border border-neutral-200 p-2 hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
                :disabled="categoryToEdit?.title === category.title"
                aria-label="Remover"
                @click="handleWantsToRemove(category)"
              >
                <Icon icon="mdi:trash" class="text-red-400" />
              </button>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <BaseConfirmDialog
      v-model="isDialogOpen"
      :loading="false"
      :label="`Deseja realmente remover a categoria ${categoryToRemove?.title}?`"
      @confirm="handleConfirmRemove"
    />
  </div>
</template>
