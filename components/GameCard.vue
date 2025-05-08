<template>
  <NuxtLink
    :to="url"
    class="p-4 border-2 border-gray-700 hover:scale-102 transition-all duration-300 pixel-corners flex flex-col"
  >
    <div class="overflow-hidden pixel-corners flex-1">
      <img
        :src="game.cover"
        :alt="game.name"
        class="object-contain w-full h-full transition transform group-hover:scale-110 duration-300"
      >
    </div>
    <div class="p-3 bg-retro-800">
      <h3 class="text-xl  line-clamp-2">
        {{ game.name_i18n['zh-CN'] }}
      </h3>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Game } from '~/shared/types'

const props = defineProps<{
  game: Game
}>()

const url = computed(() => {
  return `/games/${encodeURI(props.game.id.replace(/\s/g, '-').toLowerCase())}`
})
</script>

<style>

</style>
