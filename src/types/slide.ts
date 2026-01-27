export type SlideType = "title" | "content" | "list" | "quote"

export interface Slide {
  id: number
  type: SlideType
  title: string
  content: string | string[]
  subtitle?: string
  image?: string
  accent?: string
  number?: string
}
