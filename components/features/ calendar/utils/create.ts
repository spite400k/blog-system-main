import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { CalendarType } from '../types/calendar'
import { getDateTimeText } from 'shared/utils/date'

export const createCalendar = async () => {
  const now = new Date()
  const newCalendar: CalendarType = {
    id: getDateTimeText(now),
    title: '新しい予定',
    start: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() , 0, 0)
    ),
    end: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() , 0, 0)
    ),
    description: '',
    backgroundColor: 'yellow',
    borderColor: 'green',
    publish: false,
    releaseDate: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0)
    ),
    insDate: Timestamp.fromDate(now)
  }
  const result = insert('tbl_calendar', newCalendar, newCalendar.id)
  return result ? newCalendar : null
}

export default createCalendar
