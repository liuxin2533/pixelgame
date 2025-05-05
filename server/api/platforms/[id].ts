export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing platform ID parameter',
    })
  }

  const platform = await getPlatformById(id)

  if (!platform) {
    throw createError({
      statusCode: 404,
      statusMessage: `Platform with ID ${id} not found`,
    })
  }

  return platform
})
