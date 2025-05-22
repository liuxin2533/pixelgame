// 游戏数据类型定义
import type { Database } from '~/types/database.types'

export type Lang = 'en' | 'zh' | 'ja'

export type Game = Database['public']['Tables']['games']['Row']

export type GameName = Record<Lang, string>
export type GameAlias = Record<Lang, string[]>
export type GameGenre = Record<Lang, string[]>

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
