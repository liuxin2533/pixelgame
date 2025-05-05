import { getAllGenres } from '../../utils/dataService'

export default defineEventHandler(async () => {
  const genres = await getAllGenres()
  return genres
})
