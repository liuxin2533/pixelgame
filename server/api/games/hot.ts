export default defineEventHandler(async () => {
  const games = await getHotGames()

  return games
})
