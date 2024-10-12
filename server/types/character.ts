import type { Element, Region } from '.'
import type { WeaponType } from './weapon'

interface VA {
  english: string
  japanese: string
  chinese: string
  korean: string
}

export interface Character {
  id: number
  name: string
  icon_url: string
  rarity: number
  weapon_type: WeaponType | null
  element: Element | null
}

export interface CharacterDetails {
  id: number
  name: string
  description: string
  icon_url: string
  header_img_url: string
  rarity: number
  title: string
  element: Element | null
  weapon_type: WeaponType | null
  region: Region | null
  constellation: string
  birthday: string
  affiliation: string
  voice_actors: VA
  version_released: string
  card_img_url: string
}
