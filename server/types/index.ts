export type * from './character'
export type * from './weapon'
export type * from './nation'
export type * from './material'

interface Component {
  component_id: string
  layout: string
  data: string
  style: string
}

interface Module {
  id: string
  name: string
  is_popped: boolean
  components: Component[]
  is_customize_name: boolean
  is_abstract: boolean
  is_show_switch: boolean
  switch: boolean
  desc: string
  repeated: boolean
  is_submodule: boolean
  origin_module_id: string
  without_border: boolean
  can_delete: boolean
  is_hidden: boolean
  rich_text_editing: boolean
}

interface ValueType {
  id: string
  value: string
  mi18n_key: string
  icon: string
  enum_str: string
}

interface Key {
  id: string
  key: string
  text: string
  values: string[]
  mi18n_key: string
  is_multi_select: boolean
  is_hidden: boolean
  updated_at: string
}

interface FilterValues {
  [key: string]:
    | {
        values: string[]
        value_types: ValueType[]
        key: Key
      }
    | undefined
}

interface Ext {
  fe_ext: string
  post_ext: {
    post_id: string
    post_user_name: string
    post_time: string
    post_avatar_url: string
    url: string
  }
  server_ext: string
  personalized_color: string
  scrolling_text: string
  corner_mark: string
}

export interface EntryItem {
  entry_page_id: string
  name: string
  desc: string
  icon_url: string
  filter_values: FilterValues
}

export interface EntryPage {
  id: string
  name: string
  desc: string
  icon_url: string
  header_img_url: string
  modules: Module[]
  filter_values: FilterValues
  menu_id: string
  menu_name: string
  version: string
  langs: string[]
  template_layout: null
  edit_lock_status: string
  correct_lock_status: string
  menus: any[]
  template_id: string
  ext: Ext
  alias_name: string
  lang: string
  beta: boolean
  page_type: string
  menu_style: string
}

export type Entry<T extends boolean = true> = T extends true
  ? EntryPage
  : EntryItem

export interface ComponentData<T extends boolean = true> {
  list: T extends true
    ? {
        id: string
        key: string
        value: [string]
      }[]
    : never
  pic: T extends false ? string : never
}

export interface Response<T extends boolean = true> {
  retcode: number
  message: string
  data: {
    page: T extends true ? Record<string, any> : never
    list: T extends false ? Record<string, any>[] : never
    total: T extends false ? number : never
  }
}

export interface Element {
  id: number
  name: string
  icon_url: string
}

export interface Region {
  id: number
  name: string
}

export interface Quest {
  id: number
  name: string
}

export interface Sources {
  quest: Quest | null
  drops: string[]
}
