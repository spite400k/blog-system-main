import { update } from 'firestore/utils/update'
import { GameMovie2air } from '../types/gameMovie2air'
import { errorList } from './error'
import { validateGameMovie2air } from './validate'

export const saveGameMovie2air = async (gameMovie2air: GameMovie2air) => {
  if (process.env.NODE_ENV === 'development') console.log(gameMovie2air)

  // 記事から記号のみ抜いて、見出し記事にする
  const temp = gameMovie2air.markdown
    ? gameMovie2air.markdown.replace(/\r?\n]*/gi, '')
    : ''
  // console.log('saveGameMovie2air temp ')
  // console.dir(temp)
  gameMovie2air.excerpt = temp
    ? temp.replace(/[ -/:-@[-`{-~]*/gi, '').substring(0, 100) + '...'
    : ''

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
