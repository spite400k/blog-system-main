import { update } from 'firestore/utils/update'
import { GameMovie } from '../types/gameMovie'
import { GameMovieSlug } from '../types/slug'

export const updateGameMovieSlugs = async (
  newGameMovie: GameMovie,
  oldGameMovie: GameMovie,
  slugs: GameMovieSlug
) => {
  // remove old gameMovie's slug, and add new gameMovie's slug
  let newSlugs: string[] = [];
  if (slugs!=null) {
      newSlugs = slugs.value.filter((s: string) => s !== oldGameMovie.slug)
  }
  
  newSlugs.push(newGameMovie.slug as string)

  await update('slug', 'gameMovie', { value: newSlugs })
}
