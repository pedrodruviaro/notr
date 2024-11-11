<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <header class="border-b border-neutral-200 py-4">
    <BaseContainer>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </BaseContainer>
  </header>
</template>
