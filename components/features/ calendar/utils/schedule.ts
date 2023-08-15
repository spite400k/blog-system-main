import { CalendarType } from '../types/calendar'
import { CalendarScheduleRequest } from '../types/schedule'

export const schedule = async (calendar: CalendarType) => {
  const reqData: CalendarScheduleRequest = {
    id: calendar.id,
    name: calendar.title ?? '',
    releaseDate: calendar.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/calendar/isr/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}

export const refresh = async (calendar: CalendarType) => {
  const reqData = {
    id: calendar.id ?? '',
    name: calendar.title ?? '',
    releaseDate: calendar.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/calendar/isr/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
