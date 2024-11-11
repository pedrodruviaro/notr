import type { noteColors } from './types'

export type Note = {
  id: string
  content: string
  category?: string
  color: (typeof noteColors)[number]
  createdAt: Date
}

export type Category = {
  id: string
  title: string
}
