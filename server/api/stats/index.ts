import { getGames, getPlatforms, getAllGenres } from '../../utils/dataService'

export default defineEventHandler(async () => {
  const [games, platforms, genres] = await Promise.all([
    getGames(),
    getPlatforms(),
    getAllGenres(),
  ])

  // 计算每个平台的游戏数量
  const platformGameCounts = platforms.map((platform) => {
    const gamesCount = games.filter(game => game.platforms.includes(platform.id)).length
    return {
      id: platform.id,
      name: platform.name,
      count: gamesCount,
    }
  })

  // 计算每个类型的游戏数量
  const genreCounts = genres.map((genre) => {
    const count = games.filter(game => game.genres.includes(genre)).length
    return { genre, count }
  })

  // 按年代统计游戏数量
  const gamesByDecade = games.reduce((acc, game) => {
    // 确定游戏所属年代（例如：1980年代、1990年代等）
    const decade = Math.floor(game.releaseYear / 10) * 10
    const decadeString = `${decade}s`

    if (!acc[decadeString]) {
      acc[decadeString] = 0
    }

    acc[decadeString]++
    return acc
  }, {} as Record<string, number>)

  return {
    totalGames: games.length,
    totalPlatforms: platforms.length,
    totalGenres: genres.length,
    platformGameCounts,
    genreCounts,
    gamesByDecade,
  }
})
