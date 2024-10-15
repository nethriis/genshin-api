import { encode } from 'ufo'
import type {
  Artifact,
  ArtifactDetails,
  AttributesData,
  EntryItem,
  EntryPage
} from '../types'

export const entryToArtifact = (entry: EntryItem): Artifact => {
  return {
    id: Number(entry.entry_page_id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    reliquary_effects: entry.filter_values.reliquary_effect?.values || [],
    set_effects: {
      1: purgeHTML(entry.display_field.single_set_effect || '') || null,
      2: purgeHTML(entry.display_field.two_set_effect || '') || null,
      4: purgeHTML(entry.display_field.four_set_effect || '') || null
    },
    set_icons: {
      flower_of_life: encode(entry.display_field.flower_of_life_icon_url || ''),
      sands_of_eon: encode(entry.display_field.sands_of_eon_icon_url || ''),
      plume_of_death: encode(entry.display_field.plume_of_death_icon_url || ''),
      circlet_of_logos: encode(
        entry.display_field.circlet_of_logos_icon_url || ''
      ),
      goblet_of_eonothem: encode(
        entry.display_field.goblet_of_eonothem_icon_url || ''
      )
    }
  }
}

export const entryToArtifactDetails = async (
  entry: EntryPage
): Promise<ArtifactDetails> => {
  const baseInfo: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[0].data ||
      '{}'
  )
  const reliquarySetEffect: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Attributes')?.components[1].data ||
      '{}'
  )
  const set: AttributesData = JSON.parse(
    entry.modules.find((m) => m.name === 'Set')?.components[0].data || '{}'
  )
  const rawSources = baseInfo.list.find((a) => a.key === 'Source')?.value[0]

  return {
    id: Number(entry.id),
    name: entry.name,
    icon_url: encode(entry.icon_url),
    reliquary_effects: entry.filter_values.reliquary_effect?.values || [],
    sources: rawSources ? await htmlToJSON(rawSources || '<div></div>') : [],
    set_effects: {
      1: purgeHTML(reliquarySetEffect.single_set_effect || '') || null,
      2: purgeHTML(reliquarySetEffect.two_set_effect || '') || null,
      4: purgeHTML(reliquarySetEffect.four_set_effect || '') || null
    },
    set: {
      flower_of_life: set.flower_of_life?.title
        ? {
            title: set.flower_of_life.title,
            icon_url: encode(set.flower_of_life?.icon_url || ''),
            description: purgeHTML(set.flower_of_life?.desc || '')
          }
        : null,
      sands_of_eon: set.sands_of_eon?.title
        ? {
            title: set.sands_of_eon.title,
            icon_url: encode(set.sands_of_eon?.icon_url || ''),
            description: purgeHTML(set.sands_of_eon?.desc || '')
          }
        : null,
      plume_of_death: set.plume_of_death?.title
        ? {
            title: set.plume_of_death.title,
            icon_url: encode(set.plume_of_death?.icon_url || ''),
            description: purgeHTML(set.plume_of_death?.desc || '')
          }
        : null,
      circlet_of_logos: set.circlet_of_logos?.title
        ? {
            title: set.circlet_of_logos.title,
            icon_url: encode(set.circlet_of_logos?.icon_url || ''),
            description: purgeHTML(set.circlet_of_logos?.desc || '')
          }
        : null,
      goblet_of_eonothem: set.goblet_of_eonothem?.title
        ? {
            title: set.goblet_of_eonothem.title,
            icon_url: encode(set.goblet_of_eonothem?.icon_url || ''),
            description: purgeHTML(set.goblet_of_eonothem?.desc || '')
          }
        : null
    }
  }
}
