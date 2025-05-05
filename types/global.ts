declare global {

  interface EJS_State {
    screenshot: Uint8Array
    state: Uint8Array
  }

  interface Window {
    EJS_player: string
    EJS_gameName: string | undefined
    EJS_biosUrl: string
    EJS_gameUrl: string | undefined
    EJS_core: string | undefined
    EJS_pathtodata: string
    EJS_startOnLoaded: boolean
    EJS_saveStateDir: string
    EJS_language: string
    EJS_backgroundImage: string
    EJS_backgroundColor: string
    EJS_Buttons: Record<string, boolean>
    EJS_onSaveState: (e: EJS_State) => void
    EJS_onLoadState: (e: EJS_State) => void
  }
}
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
