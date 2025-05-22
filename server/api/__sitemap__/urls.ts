import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'
import { serverSupabaseClient } from '#supabase/server'
import type { GameAlias } from '~/shared/types'

export default defineSitemapEventHandler(async (event) => {
  const runConfig = useRuntimeConfig()
  const client = await serverSupabaseClient(event)

  const { data } = await client.from('games').select('*')
  return data?.map((g) => {
    const dir = (g.alias as GameAlias).en[0]
    const image = (g.images as Array<string>)[0]
    return {
      loc: `/games/${g.id}`,
      images: [
        {
          loc: `${runConfig.public.supabase.url}/storage/v1/object/public/games/${dir}/images/${image}`,
          title: g.name,
          caption: g.description,
        },
      ],
    }
  }) as SitemapUrlInput[]
})
