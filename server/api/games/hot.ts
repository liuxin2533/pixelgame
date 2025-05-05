import { getHotGames } from '../../utils/dataService'

export default defineEventHandler(async () => {
  const games = await getHotGames()

  return games
})
