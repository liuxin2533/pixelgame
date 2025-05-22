<template>
  <NuxtLink
    :to="url"
    class="p-4 border-2 border-gray-700 hover:scale-102 transition-all duration-300 pixel-corners flex flex-col group relative bg-retro-900/30 h-full"
  >
    <!-- 游戏封面图 -->
    <div class="overflow-hidden pixel-corners flex-1 relative">
      <img
        :src="cover"
        :alt="displayName"
        class="object-contain w-full h-full transition transform group-hover:scale-110 duration-300"
      >
    </div>

    <!-- 游戏信息区 -->
    <div class="p-3 bg-retro-800 relative z-10">
      <!-- 游戏名称 -->
      <h3 class="text-xl line-clamp-2 font-bold mb-2">
        {{ displayName }}
      </h3>

      <!-- 游戏详情 -->
      <div class="flex flex-wrap gap-2 mt-2">
        <!-- 游戏类型标签 -->
        <div
          v-for="(genre, index) in displayGenre"
          :key="index"
          class="text-xs px-2 py-[1px] border border-retro-600"
        >
          <span>{{ genre }}</span>
        </div>

        <div
          v-if="Object.keys(game.versions||{}).length>1"
          class="text-xs px-2 py-[1px] border border-retro-600"
        >
          <span>{{ $t('gamecard.multipleVersions') }}</span>
        </div>
      </div>

      <div class="flex justify-between">
        <!-- 发行商信息 -->
        <div
          v-if="publisher"
          class="mt-2 text-xs text-retro-300 flex items-center"
        >
          <span class="mr-1">{{ $t('gamecard.publisherIcon') }}</span>
          <span class="truncate">{{ publisher }}</span>
        </div>

        <!-- 玩家数量信息 -->
        <div class="mt-2 text-xs text-retro-300 flex items-center">
          <span class="mr-1">{{ $t('gamecard.playersIcon') }}</span>
          <span>{{ playerCount }}{{ $t('gamecard.playersSuffix') }}</span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import type { Game } from '~/shared/types'

const props = defineProps<{
  game: Game
}>()

const {
  displayName,
  displayGenre,
  cover,
  playerCount,
  publisher,
} = useGameLocale(props.game)

const url = computed(() => {
  return `/games/${props.game.id}`
})
</script>
