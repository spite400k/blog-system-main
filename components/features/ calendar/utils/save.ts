import { update } from 'firestore/utils/update'
import { CalendarType } from '../types/calendar'
import { errorList } from './error'
import { validateCalendar } from './validate'

export const saveCalendar = async (calendar: CalendarType) => {
  if (process.env.NODE_ENV === 'development') console.log(calendar)

  // check validate
  const error = await validateCalendar(calendar)
  if (error) {
    return error
  }
  // update calendar
  const result = await update<CalendarType>('tbl_calendar', calendar.id, calendar)

  return result ? null : errorList.update_failed
}

export default saveCalendar
