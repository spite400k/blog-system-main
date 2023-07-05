import { StorageObject } from 'components/storage/types/obj'
import { Timestamp } from 'firebase/firestore'

export type Member = {
  id: string
  name?: string
  nameEnglish?: string
  position?: string
  number?: string
  thumbnail?: StorageObject

  markdown?: string

  publish: boolean
  releaseDate: Timestamp
  insDate: Timestamp

  tags: string[]
  custom?: any
}
