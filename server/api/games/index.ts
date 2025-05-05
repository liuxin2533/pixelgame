import { getGames, getGamesByGenre, getGamesByPlatform } from '../../utils/dataService'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { platform, genre, limit } = query

  let games

  if (platform) {
    games = await getGamesByPlatform(platform as string)
  }
  else if (genre) {
    games = await getGamesByGenre(genre as string)
  }
  else {
    games = await getGames()
  }

  // 如果设置了限制，返回指定数量的游戏
  if (limit && !isNaN(Number(limit))) {
    return games.slice(0, Number(limit))
  }

  return games
})
