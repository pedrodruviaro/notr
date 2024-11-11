<script setup lang="ts">
import LayoutPage from '@/layouts/Page.vue'
import { noteColors } from '@/types/types'
import { ref } from 'vue'

const currentColor = ref<(typeof noteColors)[number]>()
</script>

<template>
  <LayoutPage>
    <h1>Create note</h1>

    <div class="flex flex-wrap gap-2">
      <button
        class="rounded-full"
        v-for="color in noteColors"
        :key="color"
        :class="{ 'outline outline-2 outline-neutral-400': currentColor === color }"
        @click="currentColor = color"
      >
        <span class="block aspect-square w-8 rounded-full" :style="{ backgroundColor: color }">
        </span>
      </button>
    </div>
  </LayoutPage>
</template>
