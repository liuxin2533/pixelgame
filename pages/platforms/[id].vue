<template>
  <div v-if="platform">
    <!-- 平台信息 -->
    <section class="py-10 relative overflow-hidden scanlines">
      <div
        class="absolute inset-0 bg-gradient-to-br from-[rgba(0,115,188,0.2)] to-[rgba(103,58,183,0.4)]"
      />
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div class="w-32 h-32 rounded-full flex items-center justify-center">
          <img
            :src="platform.logo"
            :alt="platform.name"
            class="w-20 h-20"
          >
        </div>
        <div class="text-center md:text-left">
          <h1
            class="text-3xl md:text-4xl text-white mb-2"
            style="text-shadow: var(--text-shadow-retro)"
          >
            {{ platform.name }}
          </h1>
          <p
            class="text-xl text-gray-100"
            style="text-shadow: var(--text-shadow-retro)"
          >
            {{ platform.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- 搜索和筛选 -->
    <!-- <section class="container mx-auto py-6/90 ">
      <div class="retro-container">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="w-full md:w-1/2">
            <div class="relative">
              <UInput
                v-model="searchTerm"
                placeholder="搜索游戏..."
                class="text-lg"
                :ui="{
                  base: 'w-full py-2 px-4 bg-retro-black border-2 border-gray-700 rounded-md text-gray-200 focus:border-retro-gold focus:outline-none hover:border-gray-600 transition-colors pixel-corners',
                }"
              >
                <template #trailing>
                  <UIcon
                    name="i-heroicons-magnifying-glass"
                    class="text-gray-400 h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2"
                  />
                </template>
              </UInput>
            </div>
          </div>
          <div class="flex gap-2 md:gap-4 overflow-x-auto py-2 w-full md:w-auto">
            <UButton
              v-for="filter in filters"
              :key="filter.value"
              :class="[
                activeFilter === filter.value ? 'bg-retro-gold/20 border-retro-gold/50 filter-active' : '',
                'transition-all duration-200 pixel-corners',
              ]"
              class="px-3 py-1 bg-retro-black text-gray-300 border border-gray-700 rounded-md hover:bg-retro-gold/20 hover:border-retro-gold/50 whitespace-nowrap shadow-sm"
              variant="ghost"
              @click="setActiveFilter(filter.value)"
            >
              {{ filter.label }}
            </UButton>
          </div>
        </div>
      </div>
    </section> -->

    <!-- 游戏列表 -->
    <section class="container mx-auto py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
      />
    </section>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const platformId = route.params.id as string || 'nes'

const { data, error: platformError } = await useAsyncData(`platform-${platformId}`, async () => {
  const [platform, games] = await Promise.all([$fetch(`/api/platforms/${platformId}`), $fetch(`/api/platforms/${platformId}/games`)])

  return {
    platform,
    games,
  }
})

const platform = computed(() => data.value?.platform)
const games = computed(() => data.value?.games)

if (platformError.value) {
  console.log(platformError)
}

useSeoMeta({
  title: computed(() => `${platform.value.name} - Retro Game Paradise`),
  description: 'Play classic games from FC, SFC, GBA, GBC, MD and more online. No download or installation required, enjoy childhood memories directly in your browser.',
})
</script>

<style>
/* 页面特有样式可以在这里添加 */
.platform-header {
  min-height: 200px;
  position: relative;
}

.game-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateZ(0);
  will-change: transform, box-shadow;
}

.game-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3), 0 6px 6px rgba(0, 0, 0, 0.2);
}

/* 添加像素风格按钮效果 */
.filter-active {
  position: relative;
}

.filter-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--color-retro-gold);
}

/* 添加热门游戏标签效果 */
.category-badge {
  position: relative;
  overflow: hidden;
}

.category-badge::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, transparent 48%, var(--color-retro-gold) 48%, var(--color-retro-gold) 52%, transparent 52%);
  background-size: 6px 6px;
  opacity: 0.2;
}

/* 按钮按下效果 */
button:active:not(:disabled) {
  transform: translateY(2px);
}
</style>
