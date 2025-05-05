<template>
  <div class="min-h-screen flex flex-col">
    <DefaultHeader />
    <main class="flex-grow relative">
      <slot />
    </main>
    <DefaultFooter />
  </div>
</template>
