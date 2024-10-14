import type { EntryPage, Response } from '@/server/types'
import { isArtifact } from '@/server/utils'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const { data, retcode } = await $fetch<Response>(
    `https://sg-wiki-api-static.hoyolab.com/hoyowiki/genshin/wapi/entry_page?entry_page_id=${id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Referer: 'https://wiki.hoyolab.com/'
      }
    }
  )

  if (retcode || !isArtifact(data.page)) {
    throw createError({
      status: 404,
      message: 'Character not found'
    })
  }

  return entryToArtifactDetails(data.page as any as EntryPage)
})
