<script setup lang="ts">
import BaseTitle from '@/components/Base/Title.vue'
import BaseButton from '@/components/Base/Button.vue'

const props = defineProps<{
  loading: boolean
  label: string
}>()

const emits = defineEmits<{
  confirm: []
}>()

const isOpen = defineModel<boolean>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 top-0 grid h-full w-full place-items-center bg-neutral-500 bg-opacity-50"
    >
      <div class="w-[94%] max-w-max rounded-lg bg-neutral-50 p-4">
        <BaseTitle size="xs" :label="props.label" />
        <div class="mt-6 flex items-center justify-end gap-4">
          <BaseButton
            label="Cancelar"
            variant="ghost"
            :disabled="props.loading"
            @click="isOpen = false"
          />
          <BaseButton label="Confirmar" :loading="props.loading" @click="emits('confirm')" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
