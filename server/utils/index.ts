import { HTMLToJSON } from 'html-to-json-parser'
import type { Character, Material, Nation, Weapon } from '../types'

export * from './character'

const extractText = (content: any[]) => {
  let text = ''

  content?.forEach((item) => {
    if (typeof item === 'string') {
      text += item
    } else {
      text += extractText(item.content)
    }
  })
  return text
}

export const rawToRarity = (raw: string) => Number(raw.split('-')[0])

export const htmlToJSON = async (html: string) => {
  const { content } = await HTMLToJSON(`<div>${html}</div>`)
  const result: string[] = []

  content.forEach((item: any) => {
    result.push(extractText(item.content))
  })

  return result
}

export const purgeHTML = (html: string) =>
  html.replace(/<\/?[^>]+(>|$)/g, '').trim()

export const isHTML = (html: string): boolean => {
  return /<[^>]+>/.test(html)
}

export const isCharacter = (entry: Record<string, any>): entry is Character => {
  return entry.menu_id === '2'
}

export const isWeapon = (entry: Record<string, any>): entry is Weapon => {
  return entry.menu_id === '4'
}

export const isNation = (entry: Record<string, any>): entry is Nation => {
  return entry.menu_id === '22'
}

export const isMaterial = (entry: Record<string, any>): entry is Material => {
  return entry.menu_id === '9'
}
