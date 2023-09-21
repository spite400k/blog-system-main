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

  param1: number
  param2: number
  param3: number
  param4: number
  param5: number
  param6: number

}
