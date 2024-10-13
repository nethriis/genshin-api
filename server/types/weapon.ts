import type { Region, Sources } from '.'

export interface WeaponType {
  id: number
  name: string
}

export interface Weapon {
  id: number
  name: string
  icon_url: string
  rarity: number | null
  type: WeaponType | null
}

export interface WeaponDetails {
  id: number
  name: string
  description: string
  icon_url: string
  rarity: number | null
  type: WeaponType | null
  sources: Sources
  secondary_attributes: string | null
  region: Region | null
  version_released: string
  original_img_url: string
  awakened_img_url: string
  card_img_url: string
}
