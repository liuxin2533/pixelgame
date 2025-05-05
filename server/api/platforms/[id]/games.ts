export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing platform ID parameter',
    })
  }

  const games = await getGamesByPlatform(id)

  return games
})
