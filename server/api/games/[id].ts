import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  console.log(getRequestHeaders(event))

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing game ID parameter',
    })
  }
  const client = await serverSupabaseClient(event)

  const game = await client.from('games').select('*').eq('id', id).maybeSingle()

  if (!game) {
    // await sendRedirect(event, '/404', 302)
    throw createError({
      statusCode: 404,
      statusMessage: `Game with ID ${id} not found`,
    })
  }

  return game
})
