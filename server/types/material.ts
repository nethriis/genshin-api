import type { Region } from '.'

export interface Material {
  id: number
  name: string
  icon_url: string
  type: string
}

export interface MaterialDetails {
  id: number
  name: string
  description: string
  icon_url: string
  types: string[]
  sources: string[]
  region: Region | null
  version_released: string
}
