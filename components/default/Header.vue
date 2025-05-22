<template>
  <header class="bg-white py-4 border-b-2 border-retro-gray sticky top-0 z-50">
    <div class="container m-auto px-4">
      <nav class="flex items-center justify-between">
        <a
          href="/"
          class="flex items-center space-x-2"
        >
          <img
            src="~/assets/images/logo.svg"
            :alt="$t('header.logoAlt')"
            class="w-10 h-10"
          >
          <span class="font-pixel text-retro-gold text-xl">{{ $t('header.logoText') }}</span>
        </a>

        <div class="hidden md:flex items-center space-x-6">
          <a
            href="/#platforms"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >
            {{ $t('header.platformsLink') }}
          </a>
          <a
            href="/#popular"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >
            {{ $t('header.popularLink') }}
          </a>
          <a
            href="/#about"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >
            {{ $t('header.aboutLink') }}
          </a>
        </div>

        <button
          id="mobile-menu-button"
          class="md:hidden text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>

      <!-- 移动端菜单 -->
      <div
        id="mobile-menu"
        class="md:hidden hidden  mt-2 rounded-md p-4 border border-retro-gray"
      >
        <div class="flex flex-col space-y-3">
          <a
            href="/#platforms"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >{{ $t('header.platformsLink') }}</a>
          <a
            href="/#popular"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >{{ $t('header.popularLink') }}</a>
          <a
            href="/#about"
            class="text-gray-800 hover:text-retro-gold text-lg"
          >{{ $t('header.aboutLink') }}</a>
        </div>
      </div>
    </div>
  </header>
</template>
