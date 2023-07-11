import { GameMovie } from '../types/gameMovie'
import { GameMovieScheduleRequest } from '../types/schedule'

export const schedule = async (gameMovie: GameMovie) => {
  const reqData: GameMovieScheduleRequest = {
    id: gameMovie.id,
    title: gameMovie.title ?? '',
    releaseDate: gameMovie.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/gameMovie/isr/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}

export const refresh = async (gameMovie: GameMovie) => {
  const reqData = {
    category: gameMovie.category ?? '',
    id: gameMovie.id ?? '',
    title: gameMovie.title ?? '',
    slug: gameMovie.slug,
    releaseDate: gameMovie.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/gameMovie/isr/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
