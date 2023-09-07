import { update } from 'firestore/utils/update'
import { GameMovie2air } from '../types/gameMovie2air'
import { errorList } from './error'
import { validateGameMovie2air } from './validate'

export const saveGameMovie2air = async (gameMovie2air: GameMovie2air) => {
  if (process.env.NODE_ENV === 'development') console.log('saveGameMovie2air ');console.log(gameMovie2air)

  // check validate
  const error = await validateGameMovie2air(gameMovie2air)
  if (error) {
    return error
  }

  // update gameMovie2air
  const result = await update<GameMovie2air>('gameMovie2air', gameMovie2air.id, gameMovie2air)

  return result ? null : errorList.update_failed
}

export default saveGameMovie2air
