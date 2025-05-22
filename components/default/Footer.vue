<template>
  <!-- 页脚 -->
  <footer class="py-10 border-t border-gray-800">
    <div class="container m-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 class="text-lg font-pixel text-retro-gold mb-4">
            {{ $t('footer.title') }}
          </h4>
          <p class="text-gray-400 font-retro">
            {{ $t('footer.subtitle') }}
          </p>
        </div>

        <div>
          <h4 class="text-lg font-pixel text-retro-gold mb-4">
            {{ $t('footer.quickLinksTitle') }}
          </h4>
          <ul class="space-y-2 font-retro">
            <li>
              <a
                href="/#platforms"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.platformsLink') }}
              </a>
            </li>
            <li>
              <a
                href="/#popular"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.popularLink') }}
              </a>
            </li>
            <li>
              <a
                href="/#about"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.aboutLink') }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-pixel text-retro-gold mb-4">
            {{ $t('footer.classicPlatformsTitle') }}
          </h4>
          <ul class="space-y-2 font-retro">
            <li>
              <a
                href="/platforms/nes"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.nesPlatform') }}
              </a>
            </li>
            <li>
              <a
                href="/platforms/snes"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.snesPlatform') }}
              </a>
            </li>
            <li>
              <a
                href="/platforms/gba"
                class="text-gray-400 hover:text-retro-gold"
              >
                {{ $t('footer.gbaPlatform') }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-pixel text-retro-gold mb-4">
            {{ $t('footer.contactTitle') }}
          </h4>
          <ul class="space-y-2 font-retro">
            <li class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-retro-gold mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a
                href="mailto:contact@pixelgame.vip"
                class="text-gray-400 hover:text-retro-gold"
              >contact@pixelgame.vip</a>
            </li>
            <li class="text-gray-400 mt-4 text-sm">
              {{ $t('footer.disclaimer') }}
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 pt-6 text-center">
        <p class="text-gray-400 font-retro">
          {{ $t('footer.copyright') }}
        </p>
        <p class="text-gray-600 text-sm mt-2">
          <a
            href="privacy.html"
            class="hover:text-gray-400"
          >
            {{ $t('footer.privacyPolicy') }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
