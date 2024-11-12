<script setup lang="ts">
import BaseButton from '@/components/Base/Button.vue'
import SingleCard from '@/components/Notes/Single/Card.vue'
import SingleEmpty from '@/components/Notes/Single/Empty.vue'
import { useNotesStore } from '@/stores/notes'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from 'unhead'
import type { Note } from '@/types/entities'

useHead({
  title: 'Minha nota - Not.r',
})

const route = useRoute()
const noteId = computed(() => route.params.id as string)

const note = ref<Note>()
const notesStore = useNotesStore()

onMounted(() => {
  const target = notesStore.getNoteById(noteId.value)
  note.value = target ?? undefined
})
</script>

<template>
  <div class="space-y-10" v-if="note">
    <section v-if="note">
      <SingleCard
        :content="note.content"
        :color="note.color"
        :createdAt="note.createdAt"
        :category="note.category"
      />
    </section>

    <section>
      <div class="flex justify-end">
        <BaseButton label="Editar essa nota" variant="outline" link :to="`/edit/${noteId}`" />
      </div>
    </section>
  </div>

  <SingleEmpty v-else />
</template>
