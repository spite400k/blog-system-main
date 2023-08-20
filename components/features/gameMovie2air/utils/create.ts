import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { GameMovie2air } from '../types/gameMovie2air'
import { getDateTimeText } from 'shared/utils/date'

export const createGameMovie2air = async () => {
  const now = new Date()
  const newGameMovie2air: GameMovie2air = {
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
    myTeamPoint: 0,
    gameDate: Timestamp.fromDate(now),
    opponent: ''
  }
  const result = insert('gameMovie2air', newGameMovie2air, newGameMovie2air.id)
  return result ? newGameMovie2air : null
}

export default createGameMovie2air
