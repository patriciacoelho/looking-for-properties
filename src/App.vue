<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen w-screen flex-col px-10 py-8">
    <nav class="flex w-full">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<style scoped></style>
