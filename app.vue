<script setup lang="ts">
defineOgImageComponent('Default')
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="flex flex-col items-center">
      <h1 class="text-6xl text-center text-neutral-900 font-bold">
        The Teyvat Developers
        <br />
        <span class="text-emerald-500">Awakening</span>
      </h1>

      <p class="text-center text-lg text-neutral-600 mt-6">
        Teyvat-dev is an open-source API that provides information about Genshin
        Impact.
      </p>

      <div class="flex space-x-3 mt-10">
        <NuxtLink
          to="/api"
          target="_blank"
          class="flex items-center text-sm text-white bg-emerald-500 hover:bg-emerald-600 px-3.5 py-2.5 rounded-md"
        >
          Get Started
          <Icon name="radix-icons:arrow-right" size="16" class="ml-2" />
        </NuxtLink>
        <NuxtLink
          to="https://github.com/nethriis/teyvat-dev"
          target="_blank"
          class="flex items-center text-sm text-neutral-900 hover:bg-neutral-100 px-3.5 py-2.5 rounded-md"
        >
          GitHub Repository
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
