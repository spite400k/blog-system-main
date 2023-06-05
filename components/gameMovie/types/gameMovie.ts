import { StorageObject } from 'components/storage/types/obj'
import { Timestamp } from 'firebase/firestore'

export type GameMovie = {
  id: string
  title?: string
  slug?: string
  category?: string
  publish: boolean
  releaseDate: Timestamp
  insDate: Timestamp
  markdown?: string
  thumbnail?: StorageObject
  excerpt: string
  ogImage: StorageObject
  tags: string[]
  custom?: any
}
