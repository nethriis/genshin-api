import type { Element, Region } from '.'
import type { WeaponType } from './weapon'

interface VA {
  english: string
  japanese: string
  chinese: string
  korean: string
}

interface Constellation {
  name: string
  img_url: string
  levels: {
    name: string
    description: string
    icon_url: string
  }[]
}

interface Talent {
  title: string
  description: string
  icon_url: string
  img_url: string
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
  constellation: Constellation | null
  talents: Talent[]
  birthday: string
  affiliation: string
  voice_actors: VA
  version_released: string
  card_img_url: string
}
