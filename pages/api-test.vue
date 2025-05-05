<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">
      API 测试页面
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- 游戏API -->
      <div class="border rounded p-4">
        <h2 class="text-xl font-bold mb-2">
          游戏 API
        </h2>
        <div class="space-y-2">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            @click="fetchGames"
          >
            获取全部游戏
          </button>
          <button
            class="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
            @click="fetchFeaturedGames"
          >
            获取推荐游戏
          </button>
          <button
            class="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
            @click="fetchPopularGames"
          >
            获取热门游戏
          </button>
          <div v-if="selectedGameId">
            <button
              class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
              @click="fetchGameById"
            >
              获取游戏 {{ selectedGameId }}
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              @click="fetchGameEmulator"
            >
              获取模拟器配置
            </button>
          </div>
        </div>
      </div>

      <!-- 平台API -->
      <div class="border rounded p-4">
        <h2 class="text-xl font-bold mb-2">
          平台 API
        </h2>
        <div class="space-y-2">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
            @click="fetchPlatforms"
          >
            获取全部平台
          </button>
          <div v-if="selectedPlatformId">
            <button
              class="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded"
              @click="fetchPlatformById"
            >
              获取平台 {{ selectedPlatformId }}
            </button>
            <button
              class="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded"
              @click="fetchPlatformStats"
            >
              获取平台统计
            </button>
          </div>
        </div>
      </div>

      <!-- 其他API -->
      <div class="border rounded p-4">
        <h2 class="text-xl font-bold mb-2">
          其他 API
        </h2>
        <div class="space-y-2">
          <button
            class="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
            @click="fetchGenres"
          >
            获取所有游戏类型
          </button>
          <button
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded"
            @click="fetchStats"
          >
            获取站点统计
          </button>
        </div>
      </div>

      <!-- 响应结果 -->
      <div class="border rounded p-4 md:col-span-2">
        <h2 class="text-xl font-bold mb-2">
          响应结果
        </h2>
        <div
          v-if="loading"
          class="text-center p-4"
        >
          加载中...
        </div>
        <div
          v-else-if="error"
          class="text-red-500 p-4"
        >
          <p>错误: {{ error }}</p>
        </div>
        <div
          v-else-if="result"
          class="p-2 h-96 overflow-auto bg-gray-100 rounded"
        >
          <pre>{{ JSON.stringify(result, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const error = ref<string | null>(null)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const result = ref<any>(null)
const selectedGameId = ref<string | null>(null)
const selectedPlatformId = ref<string | null>(null)

// 通用获取数据方法
async function fetchData(url: string) {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    result.value = await response.json()

    // 如果获取到了游戏列表，设置第一个游戏的ID
    if (url === '/api/games' && Array.isArray(result.value) && result.value.length > 0) {
      selectedGameId.value = result.value[0].id
    }

    // 如果获取到了平台列表，设置第一个平台的ID
    if (url === '/api/platforms' && Array.isArray(result.value) && result.value.length > 0) {
      selectedPlatformId.value = result.value[0].id
    }
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  }
  finally {
    loading.value = false
  }
}

// 游戏API测试
const fetchGames = () => fetchData('/api/games')
const fetchFeaturedGames = () => fetchData('/api/games/featured')
const fetchPopularGames = () => fetchData('/api/games/popular')
const fetchGameById = () => selectedGameId.value && fetchData(`/api/games/${selectedGameId.value}`)
const fetchGameEmulator = () => selectedGameId.value && fetchData(`/api/games/${selectedGameId.value}/emulator`)

// 平台API测试
const fetchPlatforms = () => fetchData('/api/platforms')
const fetchPlatformById = () => selectedPlatformId.value && fetchData(`/api/platforms/${selectedPlatformId.value}`)
const fetchPlatformStats = () => selectedPlatformId.value && fetchData(`/api/platforms/${selectedPlatformId.value}/stats`)

// 其他API测试
const fetchGenres = () => fetchData('/api/genres')
const fetchStats = () => fetchData('/api/stats')

// 初始化时加载游戏列表
onMounted(() => {
  fetchGames()
})
</script>
