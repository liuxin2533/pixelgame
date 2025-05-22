import type { Game, GameAlias, GameGenre, GameName, Lang } from '~/shared/types'

function getLocaleValue<T>(obj: Record<Lang, T>, rollback: Lang = 'en') {
  const { locale } = useI18n()
  return obj[locale.value] || obj[rollback] || obj['en']
}

export const useGameLocale = (data: Ref<Game> | Game | null) => {
  const runConfig = useRuntimeConfig()
  const { locale } = useI18n()

  const game = computed(() => {
    return unref(data)
  })

  const name = computed(() => {
    return game.value?.name as GameName
  })

  const displayName = computed(() => {
    return getLocaleValue(name.value)
  })

  const alias = computed(() => {
    return game.value?.alias as GameAlias
  })

  const displayAlias = computed(() => {
    return getLocaleValue(alias.value)
  })

  const genre = computed(() => {
    return game.value?.genre as GameGenre
  })

  const displayGenre = computed(() => {
    return getLocaleValue(genre.value)
  })

  const images = computed(() => {
    return game.value?.images as Array<string>
  })

  const roms = computed(() => {
    return game.value?.roms as Array<string>
  })

  const dir = computed(() => {
    return alias.value.en[0]
  })

  const cover = computed(() => {
    return `${runConfig.public.supabase.url}/storage/v1/object/public/games/${dir.value}/images/${images.value[0]}`
  })

  const playerCount = computed(() => {
    return game.value?.player_count || 1
  })

  // 获取发行商信息
  const publisher = computed(() => {
    const publishers = game.value?.publisher as string[] | null
    return publishers && publishers.length > 0 ? publishers[0] : null
  })

  // const romVersionMap = {
  //   en: ['U', 'E', 'W', 'G', 'Unl'],
  //   zh: ['ChT', 'ChS', 'As'],
  //   ja: ['J'],
  // }

  const romUrl = computed(() => {
    let rom
    // 如果是英文用户，先找美版，再找欧版
    if (locale.value === 'en') {
      rom = roms.value.find(r => r.includes('(U)'))
    }
    else if (locale.value === 'zh') {
      rom = roms.value.find(r => r.includes('(ChS)'))
      if (!rom) {
        rom = roms.value.find(r => r.includes('(ChT)'))
      }
    }
    else {
      rom = roms.value.find(r => r.includes('(J)'))
    }
    if (!rom) {
      rom = roms.value[0]
    }

    const name = rom.replace(/\s+/g, '_').replace(/\[!\]/g, '(-)')
    return `${runConfig.public.supabase.url}/storage/v1/object/public/games/${dir.value}/${name}`
  })

  const platform = computed(() => {
    return game.value?.platform.toLowerCase() || 'auto'
  })

  return {
    displayName,
    displayAlias,
    displayGenre,
    cover,
    playerCount,
    publisher,
    romUrl,
    platform,
  }
}
