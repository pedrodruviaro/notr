<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import LayoutHeader from '@/components/Layout/Header.vue'
import LayoutFooter from '@/components/Layout/Footer.vue'
</script>

<template>
  <div>
    <LayoutHeader />
    <BaseContainer as="main" class="py-10 lg:py-16" id="main">
      <slot />
    </BaseContainer>
    <LayoutFooter />
  </div>
</template>

<style scoped>
#main {
  --header-height: 83px;
  --footer-height: 69px;
  --discount-calc: calc(var(--header-height) + var(--footer-height));

  min-height: calc(100vh - var(--discount-calc));
}
</style>
