<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const currentYear = computed(() => {
  return new Date().getFullYear()
})
</script>

<template>
  <footer class="bg-neutral-100 py-6">
    <BaseContainer>
      <div
        class="flex flex-wrap items-center justify-between gap-6 text-center text-sm text-neutral-700"
      >
        <p>
          &copy; Copyright {{ currentYear }} -
          <a
            class="border-b border-neutral-400 hover:opacity-80"
            href="https://pedroruviaro.com.br/"
            target="_blank"
            rel="nofollow"
            >pedroruviaro.com.br</a
          >
        </p>

        <p class="flex items-end gap-1">
          Veja o código no
          <a
            class="flex items-center gap-1 border-b border-neutral-400 hover:opacity-80"
            href="https://github.com/pedrodruviaro/notr"
            target="_blank"
            rel="nofollow"
            >GitHub
            <Icon icon="mdi:github" class="inline" />
          </a>
        </p>
      </div>
    </BaseContainer>
  </footer>
</template>
