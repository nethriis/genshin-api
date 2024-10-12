import type { Element } from '.'

export interface Nation {
  id: number
  name: string
  icon_url: string
}

export interface NationDetails {
  id: number
  name: string
  icon_url: string
  description: string
  element: Element | null
  archon: string | null
  ideal: string | null
  main_city: string | null
  version_released: string
  img_urls: string[]
}
