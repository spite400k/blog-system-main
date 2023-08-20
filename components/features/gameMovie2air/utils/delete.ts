import { remove } from 'firestore/utils/remove'
import { GameMovie2air } from '../types/gameMovie2air'

export const deleteGameMovie2air = async (gameMovie2air: GameMovie2air) => {
  const result = await remove('gameMovie2air', gameMovie2air.id)
  return result
}

export default deleteGameMovie2air
