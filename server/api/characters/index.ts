import type { EntryItem, Response } from '~/server/types'

export default defineEventHandler(async () => {
  let page = 1
  const results = []

  while (true) {
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
          menu_id: '2',
          page_num: page,
          page_size: 50,
          use_es: true
        }
      }
    )

    results.push(
      ...data.list.map((entry) => entryToCharacter(entry as any as EntryItem))
    )
    if (!data || data.list.length < 50) break
    page++
  }
  return results
})
