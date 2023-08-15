import { Notification } from 'components/notification/types/notification'
import { CalendarType } from '../types/calendar'
import { CalendarSlug } from '../types/slug'
import { errorList } from './error'

export const validateCalendar = async (
  p: CalendarType,
  onSuccess?: (slugs: CalendarSlug) => void
): Promise<Notification | null> => {
  // empty name
  if (p.title === '' || p.title === null || p.title === undefined) {
    return errorList.name_is_empty
  }

  // empty number
  // if (p.number === '' || p.number === null || p.number === undefined) {
  //   return errorList.number_is_empty
  // }

  // empty position
  // if (p.position === '' || p.position === null || p.position === undefined) {
  //   return errorList.position_is_empty
  // }

  // same number
  // // const slugs = (await take<CalendarSlug>('slug', 'calendar')) as CalendarSlug
  // // const oldCalendar = (await take<Calendar>('calendar', p.id)) as Calendar

  // // if (
  // //   slugs != null &&
  // //   slugs.value.indexOf(p.slug ?? '') >= 0 &&
  // //   oldCalendar.slug !== p.slug
  // // ) {
  // //   return errorList.same_slug_exist
  // // }

  // // after validate, update slugs for validation
  // await updateCalendarSlugs(p, oldCalendar, slugs)

  return null
}
