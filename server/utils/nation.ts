import elements from '../constants/elements.json' assert { type: 'json' }
import type {
  AttributesData,
  EntryItem,
  EntryPage,
  GalleryData,
  Nation,
  NationDetails
} from '../types'

export const entryToNation = (entity: EntryItem): Nation => {
  return {
    id: Number(entity.entry_page_id),
    name: entity.name,
    icon_url: entity.icon_url
  }
}

export const entryToNationDetails = (entry: EntryPage): NationDetails => {
  const attributes: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[0].data ||
      '{}'
  )
  const gallery: GalleryData = JSON.parse(
    entry.modules.find((m) => m.name === 'Gallery')?.components[0].data || '{}'
  )
  const element =
    elements.find(
      (e) =>
        e.name ===
        purgeHTML(
          attributes.list.find(
            (a) => a.key === 'El­e­ment' || a.key === 'Element'
          )?.value[0] || ''
        )
    ) || null

  return {
    id: Number(entry.id),
    name: entry.name,
    icon_url: entry.icon_url,
    description: purgeHTML(entry.desc),
    element,
    archon:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Archon')?.value[0] || ''
      ) || null,
    ideal:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Ideal')?.value[0] || ''
      ) || null,
    main_city:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Main City')?.value[0] || ''
      ) || null,
    version_released:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Version Released')?.value[0] ||
          ''
      ) || 'unknown',
    img_urls: gallery.list.map((g) => g.img)
  }
}
