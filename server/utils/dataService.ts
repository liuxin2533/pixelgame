import fs from 'fs'
import path from 'path'
import type { Game, Platform } from '~/types/global'

// 数据文件路径
const GAMES_DATA_PATH = path.resolve('./server/data/games.json')
const PLATFORMS_DATA_PATH = path.resolve('./server/data/platforms.json')

/**
 * 读取游戏数据
 */
export async function getGames(): Promise<Game[]> {
  try {
    const data = await fs.promises.readFile(GAMES_DATA_PATH, 'utf8')
    return JSON.parse(data) as Game[]
  }
  catch (error) {
    console.error('Error loading games data:', error)
    return []
  }
}

/**
 * 读取平台数据
 */
export async function getPlatforms(): Promise<Platform[]> {
  try {
    const data = await fs.promises.readFile(PLATFORMS_DATA_PATH, 'utf8')
    return JSON.parse(data) as Platform[]
  }
  catch (error) {
    console.error('Error loading platforms data:', error)
    return []
  }
}

/**
 * 根据ID获取特定游戏
 */
export async function getGameById(id: string): Promise<Game | null> {
  const games = await getGames()
  const decodedId = decodeURI(id)
  return games.find(game => game.id === decodedId) || null
}

/**
 * 根据ID获取特定游戏
 */
export async function getHotGames(): Promise<Game[]> {
  const games = await getGames()
  return games.filter(game => game.hot)
}

/**
 * 根据ID获取特定平台
 */
export async function getPlatformById(id: string): Promise<Platform | null> {
  const platforms = await getPlatforms()
  return platforms.find(platform => platform.id === id) || null
}

/**
 * 获取特定平台下的所有游戏
 */
export async function getGamesByPlatform(platformId: string): Promise<Game[]> {
  const games = await getGames()
  return games.filter(game => game.platforms.includes(platformId))
}

/**
 * 获取推荐游戏
 */
export async function getFeaturedGames(limit: number = 5): Promise<Game[]> {
  const games = await getGames()
  return games
    .filter(game => game.featured)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit)
}

/**
 * 按流行度获取热门游戏
 */
export async function getPopularGames(limit: number = 10): Promise<Game[]> {
  const games = await getGames()
  return games
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, limit)
}

/**
 * 根据类型筛选游戏
 */
export async function getGamesByGenre(genre: string): Promise<Game[]> {
  const games = await getGames()
  return games.filter(game => game.genres.includes(genre))
}

/**
 * 获取所有游戏类型
 */
export async function getAllGenres(): Promise<string[]> {
  const games = await getGames()
  const genresSet = new Set<string>()

  games.forEach((game) => {
    game.genres.forEach(genre => genresSet.add(genre))
  })

  return [...genresSet]
}
