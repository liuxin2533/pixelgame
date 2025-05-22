<template>
  <div class="h-full relative">
    <!-- 英雄区 -->
    <section class="pt-32 lg:py-24 scanlines hero-pixel-dots overflow-hidden pixel-corners">
      <div
        class="absolute inset-0 bg-gradient-to-br from-[rgba(0,115,188,0.2)] to-[rgba(103,58,183,0.4)]"
      />
      <div class="relative z-10">
        <div class="max-w-3xl mx-auto text-center px-4">
          <!-- 左侧FC游戏机装饰 -->
          <div class="hidden md:block absolute left-0 bottom-1/8 transform -translate-x-1/4 z-0 opacity-70 console-float">
            <img
              src="~/assets/images/platforms/fc-console.svg"
              alt="FC游戏机"
              class="w-56 h-56 drop-shadow-[0_0_12px_rgba(255,185,56,0.8)] pixel-flicker"
            >
          </div>

          <!-- 右侧SFC游戏机装饰 -->
          <div class="hidden md:block absolute right-0 bottom-1/4 transform translate-x-1/4 z-0 opacity-70 console-float-right">
            <img
              src="~/assets/images/platforms/sfc-console.svg"
              alt="SFC游戏机"
              class="w-72 h-72 drop-shadow-[0_0_12px_rgba(255,185,56,0.8)] pixel-flicker"
            >
          </div>

          <!-- 像素风装饰元素 -->
          <div class="absolute -left-4 top-1/4 w-8 h-8 bg-retro-gold opacity-20 rotate-45" />
          <div class="absolute -right-4 bottom-1/4 w-6 h-6 bg-retro-gold opacity-20 rotate-12" />

          <h1 class="text-3xl md:text-5xl text-white mb-6 retro-text-shadow relative z-10">
            {{ $t('indexPage.heroTitlePart1') }}<span class="text-retro-gold">{{ $t('indexPage.heroTitlePart2') }}</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-white relative z-10 whitespace-pre-wrap">
            {{ $t('indexPage.heroSubtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <UButton
              to="#platforms"
            >
              {{ $t('indexPage.exploreGames') }}
            </UButton>
            <UButton
              to="#about"
            >
              {{ $t('indexPage.learnMore') }}
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 游戏平台分类 -->
    <section
      id="platforms"
      class="pt-32 bg-retro-dark/80"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl text-center mb-12 text-retro-gold">
          <span class="inline-block border-b-2 border-retro-gold pb-2">{{ $t('indexPage.platformsTitle') }}</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- FC/NES 平台卡片 -->
          <PlatformCard
            v-for="p in platforms"
            :key="p.id"
            :platform="p"
          />
        </div>
      </div>
    </section>

    <!-- 热门游戏 -->
    <section
      id="popular"
      class="pt-32 bg-gradient-to-b from-retro-dark to-retro-black"
    >
      <div class="container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl text-center mb-12 text-retro-gold">
          <span class="inline-block border-b-2 border-retro-gold pb-2">{{ $t('indexPage.popularTitle') }}</span>
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <!-- 游戏卡片 1 -->
          <GameCard
            v-for="game in hotGames"
            :key="game.id"
            :game="game"
          />
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section
      id="about"
      class="pt-32 relative overflow-hidden"
    >
      <div class="relative z-10 container mx-auto px-4">
        <h2 class="text-2xl md:text-3xl text-center mb-12 text-retro-gold">
          <span class="inline-block border-b-2 border-retro-gold pb-2">{{ $t('indexPage.aboutTitle') }}</span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-retro-gold">
          <UCard class="bg-retro-dark/60 border-2 border-gray-800 shadow-retro">
            <template #header>
              <h3 class="text-xl mb-2 text-retro-gold">
                {{ $t('indexPage.ourStoryTitle') }}
              </h3>
            </template>
            <div class="space-y-4 text-gray-800">
              <p>{{ $t('indexPage.ourStoryPara1') }}</p>
              <p>{{ $t('indexPage.ourStoryPara2') }}</p>
              <blockquote class="border-l-4 border-retro-gold pl-4 italic text-gray-400 my-4">
                "{{ $t('indexPage.ourStoryQuote') }}"
              </blockquote>
            </div>
          </UCard>

          <UCard class="bg-retro-dark/60 border-2 border-gray-800 shadow-retro">
            <template #header>
              <h3 class="text-xl mb-2 text-retro-gold">
                {{ $t('indexPage.whyChooseUsTitle') }}
              </h3>
            </template>
            <div class="space-y-3 text-gray-800">
              <div class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-retro-gold mr-2 mt-1 flex-shrink-0"
                />
                <span>{{ $t('indexPage.whyChooseUsPoint1') }}</span>
              </div>
              <div class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-retro-gold mr-2 mt-1 flex-shrink-0"
                />
                <span>{{ $t('indexPage.whyChooseUsPoint2') }}</span>
              </div>
              <div class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-retro-gold mr-2 mt-1 flex-shrink-0"
                />
                <span>{{ $t('indexPage.whyChooseUsPoint3') }}</span>
              </div>
              <div class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-retro-gold mr-2 mt-1 flex-shrink-0"
                />
                <span>{{ $t('indexPage.whyChooseUsPoint4') }}</span>
              </div>
              <div class="flex items-start">
                <UIcon
                  name="i-heroicons-check-circle"
                  class="text-retro-gold mr-2 mt-1 flex-shrink-0"
                />
                <span>{{ $t('indexPage.whyChooseUsPoint5') }}</span>
              </div>
            </div>
          </UCard>
        </div>

        <!-- 怀旧语录 -->
        <div class="mt-12 text-center max-w-3xl mx-auto">
          <div class="relative">
            <p class="text-xl md:text-2xl text-gray-800 italic">
              {{ $t('indexPage.nostalgiaQuote') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 通讯订阅 -->
    <section class="py-10 bg-retro-dark/80 border-b border-gray-800">
      <div class="container mx-auto px-4">
        <div class="max-w-lg mx-auto text-center">
          <h3 class="text-xl font-pixel text-retro-gold mb-4">
            {{ $t('indexPage.newsletterTitle') }}
          </h3>
          <p class="text-gray-800 mb-6">
            {{ $t('indexPage.newsletterSubtitle') }}
          </p>
          <UForm
            :state="formState"
            class="flex flex-col sm:flex-row gap-2"
            @submit="onSubmit"
          >
            <UFormField class="flex-1 mb-0">
              <UInput
                v-model="formState.email"
                type="email"
                :placeholder="$t('indexPage.emailPlaceholder')"
                class="w-full"
              />
            </UFormField>
            <UButton type="submit">
              {{ $t('indexPage.subscribeButton') }}
            </UButton>
          </UForm>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// defineOgImageComponent('BrandedLogo', {
//   title: '怀旧游戏天堂 - 重温经典游戏的乐趣',
//   description: '在线畅玩FC、SFC、GBA、GBC、MD等平台的经典游戏，无需下载安装，直接在浏览器中体验童年的快乐。',
//   format: 'svg',
//   disablePngGeneration: true,
// })

const { t } = useI18n()

useSeoMeta({
  title: t('indexPage.seoTitle'),
  description: t('indexPage.seoDescription'),
})

const supabase = useSupabaseClient()

const { data } = await useAsyncData('index', async () => {
  const { data: platforms } = await useFetch('/api/platforms')
  const { data: hotGames } = await supabase.from('hot').select('game_id, game:games(*)')

  return {
    platforms: platforms.value,
    hotGames,
  }
})

const platforms = computed(() => {
  return data.value?.platforms
})

const hotGames = computed(() => {
  return data.value?.hotGames?.map(x => x.game)
})
// 页面元数据
// useHead({
//   title: '怀旧游戏天堂 - 重温经典游戏的乐趣',
//   meta: [
//     { name: 'description',
//       content: '在线畅玩FC、SFC、GBA、GBC、MD等平台的经典游戏，无需下载安装，直接在浏览器中体验童年的快乐。',
//     },
//   ],
// })

const formState = ref({
  email: '',
})

// 表单提交
const onSubmit = () => {
  // 处理表单提交逻辑
  console.log('Email submitted:', formState.value.email)
  // 可以添加API调用发送订阅请求
  formState.value.email = '' // 提交后清空
}
</script>

<style>
/* 扫描线效果 */
.scanlines {
  position: relative;
}

.scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 1px,
    rgba(0, 0, 0, 0.1) 1px,
    rgba(0, 0, 0, 0.1) 4px
  );
  z-index: 0;
}

/* 像素风点缀装饰 */
.hero-pixel-dots::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(#ffb938 2px, transparent 2px);
  background-size: 30px 30px;
  opacity: 0.2;
  z-index: 0;
  pointer-events: none;
}

/* 像素风闪烁动画 */
@keyframes pixel-flicker {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.5; }
}

.pixel-flicker {
  animation: pixel-flicker 3s infinite alternate;
}

/* 游戏机悬浮效果 */
.console-float {
  animation: console-float 6s ease-in-out infinite;
}

@keyframes console-float {
  0%, 100% { transform: translateY(0) rotate(-15deg); }
  50% { transform: translateY(-10px) rotate(-15deg); }
}

.console-float-right {
  animation: console-float-right 5s ease-in-out infinite;
}

@keyframes console-float-right {
  0%, 100% { transform: translateY(0) rotate(15deg); }
  50% { transform: translateY(-8px) rotate(15deg); }
}
</style>
