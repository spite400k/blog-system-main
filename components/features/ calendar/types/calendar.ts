import { Timestamp } from 'firebase/firestore'

export type CalendarType = {
  id: string,
  title: string,
  start: Timestamp,
  end: Timestamp,
  description: string,
  backgroundColor: string,
  borderColor: string,

  publish: boolean,
  releaseDate: Timestamp,
  insDate: Timestamp,
}

export type CalendarTypeDate = {
  id: string,
  title: string,
  start: Date,
  end: Date,
  description: string,
  backgroundColor: string,
  borderColor: string,

  publish: boolean,
  releaseDate: Timestamp,
  insDate: Timestamp,
}
