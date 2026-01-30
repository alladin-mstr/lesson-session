export type SlideType = "title" | "content" | "list" | "quote" | "book"

export interface Slide {
  id: number
  type: SlideType
  title: string
  content: string | string[]
  subtitle?: string
  image?: string
  secondaryImage?: string
  accent?: string
  number?: string
}
