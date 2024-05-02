import { StorageObject } from 'components/storage/types/obj'
import { Timestamp } from 'firebase/firestore'

export type MemberType = {
  id: string
  name?: string
  nameEnglish?: string
  position?: string
  positionCategory?: string
  number?: string
  thumbnail?: StorageObject
  memberImages?: StorageObject[]

  birthday?: string
  foot?: string
  footSize?: number
  height?: number
  weight?: number

  playerExplain?: string

  bloodType?: string

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
