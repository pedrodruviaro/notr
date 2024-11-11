<script setup lang="ts">
import LayoutPage from '@/layouts/Page.vue'
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'
import BaseSkeleton from '@/components/Base/Skeleton.vue'
import NotesList from '@/components/Notes/List.vue'
import NotesCard from '@/components/Notes/Card.vue'
import NotesEmpty from '@/components/Notes/Empty.vue'
import { useNotesStore } from '@/stores/notes'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const notesStore = useNotesStore()
onMounted(() => notesStore.getNotes())

const router = useRouter()

const handleEditNote = (id: string) => router.push('/edit')

const handleRemoveNote = (id: string) => notesStore.remove(id)
</script>

<template>
  <LayoutPage>
    <section class="mb-10 lg:mb-14">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <BaseTitle label="Suas notas" />
        <BaseButton label="Nova nota" link to="/create" />
      </div>

      <div class="mt-8 flex gap-2">
        <BaseSkeleton class="h-8 w-full" />
        <BaseSkeleton class="h-8 w-full" />
        <BaseSkeleton class="h-8 w-full" />
        <BaseSkeleton class="h-8 w-full" />
      </div>
    </section>

    <section>
      <NotesList v-if="notesStore.notes.length > 0">
        <NotesCard
          v-for="note in notesStore.notes"
          :key="note.id"
          :id="note.id"
          :color="note.color"
          :content="note.content"
          :createdAt="new Date(note.createdAt)"
          @edit="handleEditNote"
          @remove="handleRemoveNote"
        />
      </NotesList>
      <NotesEmpty v-else />
    </section>
  </LayoutPage>
</template>
