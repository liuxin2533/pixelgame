<template>
  <NuxtLink
    :to="`/platforms/${platform.id}`"
    class="block relative h-full rounded-lg overflow-hidden transition-all duration-300
     hover:scale-102 hover:shadow-lg group border-2 shadow-retro"
  >
    <!-- 平台特色装饰元素作为背景 -->
    <div class="absolute inset-0 z-[1] opacity-30 transition-all duration-500 group-hover:opacity-100">
      <img
        :src="platform.logo"
        alt=""
        class="w-full h-full object-contain"
      >
    </div>

    <div class="relative z-10 flex flex-col items-center text-center p-6">
      <h3 class="font-pixel text-xl mb-4 font-bold pixel-flicker text-retro">{{ platform.name }}</h3>
      <p class="text-retro/80 p-6 leading-relaxed group-hover:opacity-5 transition-all font-semibold">
        {{ platform.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Platform } from '~/types/global'

defineProps<{
  platform: Platform
}>()
</script>

<style scoped>
.pixel-flicker {
  animation: subtle-flicker 3s infinite alternate;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

@keyframes subtle-flicker {
  0%, 100% { text-shadow: 0 0 4px rgba(255, 255, 255, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.5); }
  50% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.5); }
}
</style>
