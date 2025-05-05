import { getPlatforms } from '../../utils/dataService'

export default defineEventHandler(async () => {
  const platforms = await getPlatforms()
  return platforms
})
