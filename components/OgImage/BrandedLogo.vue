<script setup>
defineProps({
  title: { type: String, required: false, default: 'title' },
  logo: { type: String, required: false, default: '/logo.svg' },
})
</script>

<template>
  <div
    :style="{ backgroundImage: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)' }"
    class="h-full w-full flex items-start justify-start"
  >
    <div class="flex items-start justify-start h-full">
      <div class="flex flex-col justify-between w-full h-full p-20">
        <img
          :src="logo"
          width="50"
          height="50"
        >
        <h1
          class="text-[60px] text-white font-bold text-left"
          style="display: block; line-clamp: 2; text-overflow: ellipsis;"
        >
          {{ title }} - Enjoy!
        </h1>
      </div>
    </div>
  </div>
</template>
