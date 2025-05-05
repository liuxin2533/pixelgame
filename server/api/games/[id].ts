import { getGameById } from '../../utils/dataService'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing game ID parameter',
    })
  }
  const game = await getGameById(id)

  if (!game) {
    throw createError({
      statusCode: 404,
      statusMessage: `Game with ID ${id} not found`,
    })
  }

  return game
})
