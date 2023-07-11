import { update } from 'firestore/utils/update'
import { GameMovie } from '../types/gameMovie'
import { errorList } from './error'
import { validateGameMovie } from './validate'

export const saveGameMovie = async (gameMovie: GameMovie) => {
  if (process.env.NODE_ENV === 'development') console.log(gameMovie)

  // 記事から記号のみ抜いて、見出し記事にする
  const temp = gameMovie.markdown
    ? gameMovie.markdown.replace(/\r?\n]*/gi, '')
    : ''
  // console.log('saveGameMovie temp ')
  // console.dir(temp)
  gameMovie.excerpt = temp
    ? temp.replace(/[ -/:-@[-`{-~]*/gi, '').substring(0, 100) + '...'
    : ''

  // check validate
  const error = await validateGameMovie(gameMovie)
  if (error) {
    return error
  }

  // update gameMovie
  const result = await update<GameMovie>('gameMovie', gameMovie.id, gameMovie)

  return result ? null : errorList.update_failed
}

export default saveGameMovie
