<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'
</script>

<template>
  <div>
    <LayoutHeader />
    <BaseContainer as="main" class="pt-10 lg:pt-16" id="main">
      <slot />
    </BaseContainer>
    <LayoutFooter />
  </div>
</template>

<style scoped>
#main {
  min-height: calc(100vh - 126px);
}
</style>
