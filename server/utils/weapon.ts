import { encode } from 'ufo'
import { htmlToJSON, purgeHTML } from '.'
import weaponTypes from '../constants/weapon_types.json' assert { type: 'json' }
import nations from '../constants/nations.json' assert { type: 'json' }
import type {
  AttributesData,
  EntryItem,
  EntryPage,
  GalleryData,
  Weapon,
  WeaponDetails
} from '../types'

export const entryToWeapon = (entry: EntryItem): Weapon => {
  const weaponType = weaponTypes.find(
    (w) => w.name === entry.filter_values.weapon_type?.values[0]
  )

  return {
    id: Number(entry.entry_page_id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    rarity: rawToRarity(
      entry.filter_values.weapon_rarity?.values[0] || '0-Star'
    ),
    type: weaponType || null
  }
}

export const entryToWeaponDetails = async (
  entry: EntryPage
): Promise<WeaponDetails> => {
  const attributes: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[0].data ||
      '{}'
  )
  const gallery: GalleryData = JSON.parse(
    entry.modules.find((m) => m.name === 'Gallery')?.components[0].data || '{}'
  )
  const rawSources = attributes.list.find((a) => a.key === 'Source')?.value[0]
  const region =
    purgeHTML(
      attributes.list.find((a) => a.key === 'Region')?.value[0] || ''
    ) || null
  const type =
    weaponTypes.find(
      (w) =>
        w.name ===
        purgeHTML(attributes.list.find((a) => a.key === 'Type')?.value[0] || '')
    ) || null
  const nation = nations.find((n) => n.name === region) || null

  return {
    id: Number(entry.id),
    name: entry.name,
    description: purgeHTML(entry.desc),
    icon_url: encode(entry.icon_url),
    rarity: rawToRarity(
      entry.filter_values.weapon_rarity?.values[0] || '0-Star'
    ),
    type: type,
    sources: isHTML(rawSources || '')
      ? await htmlToJSON(rawSources || '<div></div>')
      : [
          `Quest - ${JSON.parse(rawSources?.replace(/\$/g, '') || '[]')[0]?.name}`
        ],
    secondary_attributes:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Secondary Attributes')
          ?.value[0] || ''
      ) || null,
    region: nation,
    version_released:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Version Released')?.value[0] ||
          ''
      ) || 'unknown',
    original_img_url: gallery.list.find((g) => g.key === 'Original')?.img || '',
    awakened_img_url: gallery.list.find((g) => g.key === 'Awakened')?.img || '',
    card_img_url: gallery.pic || ''
  }
}
