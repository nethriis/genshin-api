import type { EntryItem, Response } from '@/server/types'

export default defineEventHandler(async () => {
  const { data } = await $fetch<Response<false>>(
    'https://sg-wiki-api.hoyolab.com/hoyowiki/genshin/wapi/get_entry_page_list',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Referer: 'https://wiki.hoyolab.com/'
      },
      body: {
        filters: [],
        menu_id: '22',
        page_num: 1,
        page_size: 50,
        use_es: true
      }
    }
  )

  return data.list.map((entry) => entryToNation(entry as any as EntryItem))
})
