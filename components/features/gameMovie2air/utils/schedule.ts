import { GameMovie2air } from '../types/gameMovie2air'
import { GameMovie2airScheduleRequest } from '../types/schedule'

export const schedule = async (gameMovie2air: GameMovie2air) => {
  const reqData: GameMovie2airScheduleRequest = {
    id: gameMovie2air.id,
    title: gameMovie2air.title ?? '',
    releaseDate: gameMovie2air.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/gameMovie2air/isr/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}

export const refresh = async (gameMovie2air: GameMovie2air) => {
  const reqData = {
    category: gameMovie2air.category ?? '',
    id: gameMovie2air.id ?? '',
    title: gameMovie2air.title ?? '',
    slug: gameMovie2air.slug,
    releaseDate: gameMovie2air.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/gameMovie2air/isr/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
