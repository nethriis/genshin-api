interface Set {
  flower_of_life: {
    title: string
    icon_url: string
    description: string
  } | null
  sands_of_eon: {
    title: string
    icon_url: string
    description: string
  } | null
  plume_of_death: {
    title: string
    icon_url: string
    description: string
  } | null
  circlet_of_logos: {
    title: string
    icon_url: string
    description: string
  } | null
  goblet_of_eonothem: {
    title: string
    icon_url: string
    description: string
  } | null
}

export interface Artifact {
  id: number
  name: string
  icon_url: string
  set_icons: {
    flower_of_life: string
    sands_of_eon: string
    plume_of_death: string
    circlet_of_logos: string
    goblet_of_eonothem: string
  }
  reliquary_effects: string[]
  set_effects: {
    1: string | null
    2: string | null
    4: string | null
  }
}

export interface ArtifactDetails {
  id: number
  name: string
  icon_url: string
  sources: string[]
  reliquary_effects: string[]
  set_effects: {
    1: string | null
    2: string | null
    4: string | null
  }
  set: Set
}
