export type PostScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}

export type GameMovieScheduleEndpoint = {
  categoryId: string
  endpoints: string[]
}

export type TayoriSettings = {
  schedules: PostScheduleEndpoint[]
  schedulesGameMovie: GameMovieScheduleEndpoint[]
}
