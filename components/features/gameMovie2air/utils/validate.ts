import { Notification } from 'components/notification/types/notification'
import { take } from 'firestore/utils/take'
import { GameMovie2air } from '../types/gameMovie2air'
import { GameMovie2airSlug } from '../types/slug'
import { errorList } from './error'
import { updateGameMovie2airSlugs } from './slug'

export const validateGameMovie2air = async (
  p: GameMovie2air,
  onSuccess?: (slugs: GameMovie2airSlug) => void
): Promise<Notification | null> => {
  // empty title
  if (p.title === '' || p.title === null || p.title === undefined) {
    return errorList.title_is_empty
  }

  // empty slug
  if (p.slug === '' || p.slug === null || p.slug === undefined) {
    return errorList.slug_is_empty
  }

  // same slug
  const slugs = (await take<GameMovie2airSlug>(
    'slug',
    'gameMovie2air'
  )) as GameMovie2airSlug
  const oldGameMovie2air = (await take<GameMovie2air>('gameMovie2air', p.id)) as GameMovie2air

  if (
    slugs != null &&
    slugs.value.indexOf(p.slug ?? '') >= 0 &&
    oldGameMovie2air.slug !== p.slug
  ) {
    return errorList.same_slug_exist
  }

  // after validate, update slugs for validation
  await updateGameMovie2airSlugs(p, oldGameMovie2air, slugs)

  return null
}
