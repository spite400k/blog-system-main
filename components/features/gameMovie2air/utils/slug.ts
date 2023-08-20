import { update } from 'firestore/utils/update'
import { GameMovie2air } from '../types/gameMovie2air'
import { GameMovie2airSlug } from '../types/slug'

export const updateGameMovie2airSlugs = async (
  newGameMovie2air: GameMovie2air,
  oldGameMovie2air: GameMovie2air,
  slugs: GameMovie2airSlug
) => {
  // remove old gameMovie2air's slug, and add new gameMovie2air's slug
  let newSlugs: string[] = [];
  if (slugs!=null) {
      newSlugs = slugs.value.filter((s: string) => s !== oldGameMovie2air.slug)
  }
  
  newSlugs.push(newGameMovie2air.slug as string)

  await update('slug', 'gameMovie2air', { value: newSlugs })
}
