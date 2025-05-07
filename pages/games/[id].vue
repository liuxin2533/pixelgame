<template>
  <div
    v-if="game"
    class="min-h-screen flex flex-col container mx-auto p-4"
  >
    <div class="flex items-center space-x-4 mb-4">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        @click="$router.back()"
      />
      <h1
        id="game-title"
        class="text-3xl retro-text-shadow"
      >
        {{ game.name }}
      </h1>
    </div>

    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-2/3">
        <!-- 游戏模拟器容器 -->
        <div class="overflow-hidden aspect-4/3 pixel-corners">
          <div
            id="game"
          />
        </div>
      </div>

      <div class="md:w-1/3 pixel-corners">
        <div class="rounded-md border border-gray-800 h-full p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-pixel">
              游戏信息
            </h3>
            <!-- <UBadge class="text-white text-xs rounded-md">
                  {{ game.name }}
                </UBadge> -->
          </div>

          <div class="space-y-4">
            <div class="flex">
              <img
                :src="game.cover"
                alt="游戏封面"
                class="w-40 h-30 object-cover pixel-corners"
              >
              <div class="ml-4">
                <p class="text-gray-800">
                  <span>类型：</span>
                  <span>{{ game.genres }}</span>
                </p>
                <p class="text-gray-800">
                  <span>发行年份：</span>
                  <span>{{ game.releaseYear }}</span>
                </p>
                <p class="text-gray-800">
                  <span>开发商：</span>
                  <span>{{ game.developer }}</span>
                </p>
              </div>
            </div>

            <div>
              <p class="mb-1">
                游戏简介：
              </p>
              <p class="text-gray-800 font-retro">
                {{ game.description }}
              </p>
            </div>

            <!-- <div class="border-t border-gray-700 pt-4">
                  <h4 class="text-retro-gold font-pixel text-sm mb-2">
                    相关游戏推荐
                  </h4>
                  <div class="grid grid-cols-2 gap-2">
                    <NuxtLink
                      v-for="game in relatedGames"
                      :key="game.id"
                      :to="`/${game.platform}/${game.slug}`"
                      class="relative group"
                    >
                      <img
                        :src="game.cover"
                        :alt="game.title"
                        class="w-full h-20 object-cover rounded"
                      >
                      <div class="absolute inset-0 bg-retro-black/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span class="text-white text-sm">{{ game.title }}</span>
                      </div>
                    </NuxtLink>
                  </div>
                </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Game } from '~/shared/types'

const route = useRoute()
const id = route.params.id as string

const { data: game } = await useFetch<Game>(`/api/games/${id}`)

function setupEmulatorJS() {
  if (!import.meta.client || !game.value) return

  window.EJS_player = '#game'
  window.EJS_gameName = game.value.name
  window.EJS_core = game.value.emulatorSettings?.type
  window.EJS_gameUrl = `/roms/${game.value.id}.${game.value.emulatorSettings?.romType}`
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
  window.EJS_backgroundImage = `"${window.location.origin + game.value.cover}"`
  window.EJS_backgroundColor = 'transparent'
  window.EJS_language = 'zh-CN'
  window.EJS_Buttons = {
    playPause: true,
    restart: true,
    mute: true,
    volume: true,
    gamepad: true,
    fullscreen: true,
    screenshot: true,
    quickSave: false,
    quickLoad: false,
    saveState: false,
    loadState: false,
    settings: false,
    screenRecord: false,
    cheat: false,
    saveSavFiles: false,
    loadSavFiles: false,
    cacheManager: false,
    exitEmulation: false,
  }

  // 加载EmulatorJS加载器脚本
  const loaderScript = document.createElement('script')
  loaderScript.src = 'https://cdn.emulatorjs.org/stable/data/loader.js'
  document.body.appendChild(loaderScript)
}

// 在页面加载时获取游戏数据
onMounted(async () => {
  try {
    nextTick(() => {
      setupEmulatorJS()
    })
  }
  catch (error) {
    console.error('获取游戏数据失败', error)
  }
})

useSeoMeta({
  title: computed(() => `${game.value.name} - 怀旧游戏天堂`),
  description: '在线畅玩FC、SFC、GBA、GBC、MD等平台的经典游戏，无需下载安装，直接在浏览器中体验童年的快乐。',
})

// 页面元数据
// useHead({
//   title: computed(() => `${gameData.value.title || '游戏'} - 怀旧游戏天堂`),
//   meta: [
//     {
//       name: 'description',
//       content: computed(() => gameData.value.description || '在线畅玩经典游戏，无需下载，重温童年美好回忆。'),
//     },
//   ],
// })
</script>
