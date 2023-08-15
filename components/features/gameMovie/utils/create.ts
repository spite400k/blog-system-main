import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { GameMovie } from '../types/gameMovie'
import { getDateTimeText } from 'shared/utils/date'

export const createGameMovie = async () => {
  const now = new Date()
  const newGameMovie: GameMovie = {
    id: getDateTimeText(now),
    title: '新しい試合映像の投稿',
    category: '',
    slug: getDateTimeText(now),
    publish: false,
    releaseDate: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0)
    ),
    custom: {},
    insDate: Timestamp.fromDate(now),
    excerpt: '',
    ogImage: { name: 'noImage', url: '/dog.png' },
    thumbnail: { name: 'noImage', url: '/dog.png' },
    tags: [],
    videoUrl: '',
    videoUrlHighlight: '',
    place: '',
    opponentName: '',
    opponentPoint: 0,
    myTeamName: '',
    myTeamPoint: 0
  }
  const result = insert('gameMovie', newGameMovie, newGameMovie.id)
  return result ? newGameMovie : null
}

export default createGameMovie
