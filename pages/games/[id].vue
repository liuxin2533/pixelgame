<template>
  <NuxtErrorBoundary>
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
          {{ displayName }}
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
                {{ $t('gameDetailsPage.gameInfoTitle') }}
              </h3>
            <!-- <UBadge class="text-white text-xs rounded-md">
                  {{ game.name }}
                </UBadge> -->
            </div>

            <div class="space-y-4">
              <div class="flex">
                <img
                  :src="cover"
                  :alt="$t('gameDetailsPage.gameCoverAlt')"
                  class="w-40 h-30 object-cover pixel-corners"
                >
                <div class="ml-4">
                  <p class="text-gray-800">
                    <span>{{ $t('gameDetailsPage.typeLabel') }}</span>
                    <span>{{ displayGenre.join(',') }}</span>
                  </p>
                  <p class="text-gray-800">
                    <span>{{ $t('gameDetailsPage.playersLabel') }}</span>
                    <span>{{ playerCount }}</span>
                  </p>
                  <p class="text-gray-800">
                    <span>{{ $t('gameDetailsPage.publisherLabel') }}</span>
                    <span>{{ publisher }}</span>
                  </p>
                </div>
              </div>

              <div>
                <p class="mb-1">
                  {{ $t('gameDetailsPage.descriptionTitle') }}
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
    <template #error="{ error, clearError }">
      {{ $t('gameDetailsPage.localErrorDisplay', { error: error }) }}
      <button @click="clearError">
        {{ $t('gameDetailsPage.clearErrorButton') }}
      </button>
    </template>
  </NuxtErrorBoundary>
</template>

<script lang="ts" setup>
import type { Game } from '~/shared/types'

const route = useRoute()
const id = route.params.id as string

const { t, locale, locales } = useI18n()

const supabase = useSupabaseClient()
const { data: game } = await useAsyncData(`game-${id}`, async () => {
  const { data } = await supabase.from('games')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  return data
})

const {
  displayName,
  displayGenre,
  cover,
  playerCount,
  publisher,
  romUrl,
  platform,

} = useGameLocale(game as Ref<Game>)

function setupEmulatorJS() {
  if (!import.meta.client || !game.value) return

  window.EJS_player = '#game'
  window.EJS_gameName = displayName.value
  window.EJS_core = platform.value
  window.EJS_gameUrl = romUrl.value
  window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/'
  window.EJS_backgroundImage = `"${cover.value}"`
  window.EJS_backgroundColor = 'transparent'
  window.EJS_language = locales.value.filter(l => l.code === locale.value)[0]?.language || 'en-US'
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
    console.error(t('gameDetailsPage.fetchError'), error)
  }
})

useSeoMeta({
  title: computed(() => `${displayName.value}${t('gameDetailsPage.seoTitleSuffix')}`),
  description: t('gameDetailsPage.seoDescription'),
})
</script>
