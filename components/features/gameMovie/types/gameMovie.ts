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
  place:string
  gameDate:Timestamp
  opponent:string
  custom?: any
  videoUrl: string
  videoUrlHighlight: string
  place: string
  gameDate?: Timestamp
  opponentName: string
  opponentPoint: number
  myTeamName: string
  myTeamPoint: number
}
