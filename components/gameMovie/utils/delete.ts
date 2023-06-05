import { remove } from 'firestore/utils/remove'
import { GameMovie } from '../types/gameMovie'

export const deleteGameMovie = async (gameMovie: GameMovie) => {
  const result = await remove('gameMovie', gameMovie.id)
  return result
}

export default deleteGameMovie
