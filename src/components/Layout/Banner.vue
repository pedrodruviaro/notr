<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import { onMounted, ref } from 'vue'

const BANNER_KEY = 'notr-has-seen-banner'

const emits = defineEmits<{
  action: []
}>()

const showBanner = ref(false)

onMounted(() => {
  const hasSeen = sessionStorage.getItem(BANNER_KEY)

  if (hasSeen) {
    showBanner.value = false
    return
  }

  showBanner.value = true
  sessionStorage.setItem(BANNER_KEY, JSON.stringify(true))
})

const handleClose = () => {
  showBanner.value = false
  sessionStorage.setItem(BANNER_KEY, JSON.stringify(true))
}

defineExpose({
  handleClose,
})
</script>

<template>
  <div class="bg-primary py-2 text-sm" v-if="showBanner">
    <BaseContainer class="flex items-center justify-between gap-2">
      <p>
        Está experimentando o app?
        <button class="border-b border-neutral-800" @click="emits('action')">
          Insira dados de teste e veja como funciona
        </button>
      </p>

      <button class="text-lg" @click="handleClose">&times;</button>
    </BaseContainer>
  </div>
</template>
