// 游戏数据类型定义
export interface Game {
  id: string
  name: string
  description: string
  cover: string
  screenshots: string[]
  releaseYear: number
  developer: string
  publisher: string
  genres: string[]
  platforms: string[]
  rating: number
  featured?: boolean
  hot?: boolean
  popularity?: number
  downloadUrl?: string
  emulatorSettings?: {
    type: string
    romType: string
    configOptions?: Record<string, unknown>
  }
}

// 平台数据类型定义
export interface Platform {
  id: string
  name: string
  description: string
  logo: string
  releaseYear: number
  manufacturer: string
  discontinued?: number
  specifications?: Record<string, string>
  totalGames?: number
  featured?: boolean
  emulator?: {
    name: string
    downloadUrl?: string
    configInstructions?: string
  }
}
