import type { Game } from '~/types/global'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing platform ID parameter',
    })
  }

  // 获取平台信息和该平台的所有游戏
  const [platform, games] = await Promise.all([
    getPlatformById(id),
    getGamesByPlatform(id),
  ])

  if (!platform) {
    throw createError({
      statusCode: 404,
      statusMessage: `Platform with ID ${id} not found`,
    })
  }

  // 获取该平台上热门游戏（按人气排序）
  const popularGames = [...games]
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 5)

  // 按年份分组游戏
  const gamesByYear = games.reduce<Record<number, Game[]>>((acc, game) => {
    if (!acc[game.releaseYear]) {
      acc[game.releaseYear] = []
    }
    acc[game.releaseYear].push(game)
    return acc
  }, {})

  // 该平台的游戏类型统计
  const genres = games.reduce((acc, game) => {
    game.genres.forEach((genre) => {
      if (!acc[genre]) {
        acc[genre] = 0
      }
      acc[genre]++
    })
    return acc
  }, {} as Record<string, number>)

  return {
    platform,
    gamesCount: games.length,
    popularGames,
    gamesByYear,
    genres,
  }
})
