import { Notification } from 'components/notification/types/notification'
import { take } from 'firestore/utils/take'
import { GameMovie } from '../types/gameMovie'
import { GameMovieSlug } from '../types/slug'
import { errorList } from './error'
import { updateGameMovieSlugs } from './slug'

export const validateGameMovie = async (
  p: GameMovie,
  onSuccess?: (slugs: GameMovieSlug) => void
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
  const slugs = (await take<GameMovieSlug>(
    'slug',
    'gameMovie'
  )) as GameMovieSlug
  const oldGameMovie = (await take<GameMovie>('gameMovie', p.id)) as GameMovie

  if (
    slugs != null &&
    slugs.value.indexOf(p.slug ?? '') >= 0 &&
    oldGameMovie.slug !== p.slug
  ) {
    return errorList.same_slug_exist
  }

  // after validate, update slugs for validation
  await updateGameMovieSlugs(p, oldGameMovie, slugs)

  return null
}
