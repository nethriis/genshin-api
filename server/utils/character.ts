import { encode } from 'ufo'
import { purgeHTML, rawToRarity } from '.'
import elements from '../constants/elements.json' assert { type: 'json' }
import weaponTypes from '../constants/weapon_types.json' assert { type: 'json' }
import nations from '../constants/nations.json' assert { type: 'json' }
import type {
  AttributesData,
  Character,
  CharacterDetails,
  EntryItem,
  EntryPage,
  GalleryData
} from '../types'

export const entryToCharacter = (entry: EntryItem): Character => {
  const element = elements.find(
    (e) => e.name === entry.filter_values.character_vision?.values[0]
  )
  const weaponType = weaponTypes.find(
    (w) => w.name === entry.filter_values.character_weapon?.value_types[0].value
  )!

  return {
    id: Number(entry.entry_page_id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    rarity: rawToRarity(
      entry.filter_values.character_rarity?.values[0] || '0-Star'
    ),
    element: element || null,
    weapon_type: weaponType
  }
}

export const entryToCharacterDetails = (entry: EntryPage): CharacterDetails => {
  const element = elements.find(
    (e) => e.name === entry.filter_values.character_vision?.values[0]
  )
  const weaponType = weaponTypes.find(
    (w) => w.name === entry.filter_values.character_weapon?.value_types[0].value
  )!
  const nation = nations.find(
    (n) => n.name === entry.filter_values.character_region?.values[0]
  )
  const attributes: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[0].data ||
      '{}'
  )
  const gallery: GalleryData = JSON.parse(
    entry.modules.find((m) => m.name === 'Gallery')?.components[0].data || '{}'
  )
  const constellation: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Constellation')?.components[0].data ||
      '{}'
  )

  return {
    id: Number(entry.id),
    name: entry.name,
    description: entry.desc.replace(/<\/?[^>]+(>|$)/g, '').trim(),
    icon_url: encode(entry.icon_url),
    header_img_url: encode(entry.header_img_url),
    rarity: rawToRarity(
      entry.filter_values.character_rarity?.values[0] || '0-Star'
    ),
    title:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Title')?.value[0] || ''
      ) || 'unknown',
    element: element || null,
    weapon_type: weaponType,
    region: nation || null,
    constellation: attributes.list.find((a) => a.key === 'Constellation')
      ? {
          name: purgeHTML(
            attributes.list.find((a) => a.key === 'Constellation')?.value[0] ||
              ''
          ),
          img_url: encode(
            gallery.list.find((g) => g.key === 'Constellation')?.img || ''
          ),
          levels: constellation.list.map((c: any) => ({
            name: c.name,
            description: purgeHTML(c.desc),
            icon_url: encode(c.icon_url)
          }))
        }
      : null,
    birthday:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Birthday')?.value[0] || ''
      ) || 'unknown',
    affiliation:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Affiliation')?.value[0] || ''
      ) || 'unknown',
    voice_actors: {
      english:
        purgeHTML(
          attributes.list.find((a) => a.key === 'English VA')?.value[0] || ''
        ) || 'unknown',
      japanese:
        purgeHTML(
          attributes.list.find((a) => a.key === 'Japanese VA')?.value[0] || ''
        ) || 'unknown',
      chinese:
        purgeHTML(
          attributes.list.find((a) => a.key === 'Chinese VA')?.value[0] || ''
        ) || 'unknown',
      korean:
        purgeHTML(
          attributes.list.find((a) => a.key === 'Korean VA')?.value[0] || ''
        ) || 'unknown'
    },
    version_released:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Version Released')?.value[0] ||
          ''
      ) || 'unknown',
    card_img_url: encode(gallery.pic)
  }
}
