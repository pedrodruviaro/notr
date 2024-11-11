<script setup lang="ts">
import BaseContainer from '@/components/Base/Container.vue'
import Logo from '@/components/Logo.vue'
</script>

<template>
  <header class="border-b border-neutral-200 py-4">
    <BaseContainer>
      <nav class="flex flex-wrap items-center justify-between gap-2">
        <RouterLink id="logo" to="/" class="block max-w-max">
          <Logo />
        </RouterLink>

        <div class="flex gap-4">
          <RouterLink
            class="border-b border-transparent font-semibold hover:opacity-80 md:text-lg"
            to="/"
            >Notas</RouterLink
          >
          <RouterLink
            class="border-b border-transparent font-semibold hover:opacity-80 md:text-lg"
            to="/categories"
            >Categorias</RouterLink
          >
        </div>
      </nav>
    </BaseContainer>
  </header>
</template>

<style scoped>
.router-link-exact-active {
  @apply border-b border-neutral-400;
}

#logo {
  border-bottom: none !important;
}
</style>
