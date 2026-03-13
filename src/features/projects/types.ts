export type AssetType = "pdf" | "video"

export interface ProjectAsset {
  type:        AssetType
  label:       string
  description: string
  path?:       string   // PDF path under /public
  url?:        string   // YouTube embed URL
}

export interface Project {
  slug:            string
  title:           string
  subtitle:        string
  category:        string
  description:     string
  longDescription: string
  highlights:      string[]
  assets:          ProjectAsset[]
}
