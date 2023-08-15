import { remove } from 'firestore/utils/remove'
import { CalendarType } from '../types/calendar'

export const deleteCalendar = async (calendar: CalendarType) => {
  const result = await remove('tbl_calendar', calendar.id)
  return result
}

export default deleteCalendar
