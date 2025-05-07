import { defineSitemapEventHandler } from '#imports'
import type { SitemapUrlInput } from '#sitemap/types'

export default defineSitemapEventHandler(async () => {
  const games = await getGames()
  return games.map((g) => {
    return {
      loc: `/games/${g.id}`,
      images: [
        {
          loc: g.cover,
          title: g.name,
          caption: g.description,
        },
      ],
    }
  }) satisfies SitemapUrlInput[]
})
