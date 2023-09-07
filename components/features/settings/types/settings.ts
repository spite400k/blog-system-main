export type PostScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}

export type GameMovieScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}
export type GameMovie2airScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}


export type CalendarScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}

export type TayoriSettings = {
  schedules: PostScheduleEndpoint[]
  schedulesGameMovie: GameMovieScheduleEndpoint[]
  schedulesGameMovie2air: GameMovieScheduleEndpoint[]
}
