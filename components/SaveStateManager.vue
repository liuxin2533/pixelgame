<template>
  <div>
    <!-- 存档弹窗 -->
    <UModal v-model="showSaveModal">
      <div class="p-4 max-w-md w-full">
        <h3 class="text-lg font-pixel mb-4">
          保存游戏存档
        </h3>
        <div class="mb-4">
          <UFormGroup label="存档名称">
            <UInput
              v-model="saveName"
              placeholder="输入存档名称"
            />
          </UFormGroup>
        </div>
        <div class="flex justify-between">
          <UButton
            variant="outline"
            @click="showSaveModal = false"
          >
            取消
          </UButton>
          <UButton
            variant="solid"
            color="success"
            @click="saveState"
          >
            保存
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- 读档弹窗 -->
    <UModal v-model="showLoadModal">
      <div class="p-4 max-w-md w-full">
        <h3 class="text-lg font-pixel mb-4">
          加载游戏存档
        </h3>
        <div
          v-if="saveList.length === 0"
          class="text-center py-4"
        >
          <p>没有可用的存档</p>
        </div>
        <div
          v-else
          class="mb-4 max-h-60 overflow-y-auto"
        >
          <div
            v-for="(save, index) in saveList"
            :key="index"
            class="p-2 border border-gray-200 rounded mb-2 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
            @click="selectSave(save)"
          >
            <div>
              <p class="font-medium">
                {{ save.name }}
              </p>
              <p class="text-xs text-gray-500">
                {{ formatDate(save.date) }}
              </p>
            </div>
            <div class="flex space-x-2">
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="xs"
                @click.stop="deleteSave(save.id)"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <UButton
            variant="outline"
            @click="showLoadModal = false"
          >
            取消
          </UButton>
          <UButton
            variant="solid"
            color="primary"
            :disabled="!selectedSave"
            @click="loadSelectedSave"
          >
            加载
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface SaveData {
  id: string
  name: string
  date: number
  gameId: string
  screenshot: string
  state: string
}

const props = defineProps<{
  gameId: string
}>()

const emit = defineEmits<{
  'load-state': [state: Uint8Array]
}>()

// 模态框状态
const showSaveModal = ref(false)
const showLoadModal = ref(false)
const saveName = ref('')
const currentState = ref<{ screenshot: Uint8Array, state: Uint8Array } | null>(null)
const selectedSave = ref<SaveData | null>(null)

// 计算当前游戏的存档列表
const saveList = computed(() => {
  // 获取本地存储中的所有存档
  const saves = getAllSaves()
  // 过滤出当前游戏的存档
  return saves.filter(save => save.gameId === props.gameId)
})

// 获取所有存档
function getAllSaves(): SaveData[] {
  try {
    const savesJson = localStorage.getItem('game_saves')
    return savesJson ? JSON.parse(savesJson) : []
  }
  catch (error) {
    console.error('读取存档失败', error)
    return []
  }
}

// 保存所有存档
function saveAllSaves(saves: SaveData[]) {
  localStorage.setItem('game_saves', JSON.stringify(saves))
}

// 打开保存对话框
function openSaveDialog(state: { screenshot: Uint8Array, state: Uint8Array }) {
  currentState.value = state
  saveName.value = `存档 ${new Date().toLocaleDateString()}`
  showSaveModal.value = true
}

// 打开加载对话框
function openLoadDialog() {
  selectedSave.value = null
  showLoadModal.value = true
}

// 将Uint8Array转换为Base64字符串
function arrayBufferToBase64(buffer: Uint8Array): string {
  const binary = Array.from(new Uint8Array(buffer))
    .map(b => String.fromCharCode(b))
    .join('')
  return window.btoa(binary)
}

// 将Base64字符串转换回Uint8Array
function base64ToArrayBuffer(base64: string): Uint8Array {
  const binaryString = window.atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

// 保存状态
function saveState() {
  if (!currentState.value) return

  const saves = getAllSaves()
  const newSave: SaveData = {
    id: crypto.randomUUID(),
    name: saveName.value || `存档 ${new Date().toLocaleDateString()}`,
    date: Date.now(),
    gameId: props.gameId,
    screenshot: arrayBufferToBase64(currentState.value.screenshot),
    state: arrayBufferToBase64(currentState.value.state),
  }

  saves.push(newSave)
  saveAllSaves(saves)
  showSaveModal.value = false
  saveName.value = ''
}

// 选择存档
function selectSave(save: SaveData) {
  selectedSave.value = save
}

// 加载选中的存档
function loadSelectedSave() {
  if (!selectedSave.value) return

  const stateUint8Array = base64ToArrayBuffer(selectedSave.value.state)
  emit('load-state', stateUint8Array)
  showLoadModal.value = false
}

// 删除存档
function deleteSave(saveId: string) {
  const saves = getAllSaves()
  const filteredSaves = saves.filter(save => save.id !== saveId)
  saveAllSaves(filteredSaves)

  if (selectedSave.value?.id === saveId) {
    selectedSave.value = null
  }
}

// 格式化日期
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}

// 暴露方法供父组件调用
defineExpose({
  openSaveDialog,
  openLoadDialog,
})
</script>
