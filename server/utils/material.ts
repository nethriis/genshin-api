import { encode } from 'ufo'
import { htmlToJSON, isHTML } from '.'
import nations from '../constants/nations.json' assert { type: 'json' }
import type {
  AttributesData,
  EntryItem,
  EntryPage,
  Material,
  MaterialDetails
} from '../types'

export const entryToMaterial = (entry: EntryItem): Material => {
  return {
    id: Number(entry.entry_page_id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    type: entry.filter_values.object_type?.value_types[0].value || 'unknown'
  }
}

export const entryToMaterialDetails = async (
  entry: EntryPage
): Promise<MaterialDetails> => {
  const attributes: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[0].data ||
      '{}'
  )
  const rawSources = attributes.list.find((a) => a.key === 'Source')?.value[0]
  const rawTypes = attributes.list.find((a) => a.key === 'Type')?.value[0] || ''
  const types = isHTML(rawTypes) ? await htmlToJSON(rawTypes) : [rawTypes]
  const region =
    purgeHTML(
      attributes.list.find((a) => a.key === 'Region')?.value[0] || ''
    ) || null

  return {
    id: Number(entry.id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    description: purgeHTML(entry.desc),
    types,
    sources: isHTML(rawSources || '')
      ? await htmlToJSON(rawSources || '<div></div>')
      : [
          `Quest - ${JSON.parse(rawSources?.replace(/\$/g, '') || '[]')[0]?.name}`
        ],
    region: nations.find((n) => n.name === region) || null,
    version_released:
      purgeHTML(
        attributes.list.find((a) => a.key === 'Version Released')?.value[0] ||
          ''
      ) || 'unknown'
  }
}
