import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { Member } from '../types/member'
import { getDateTimeText } from 'shared/utils/date'

export const createMember = async () => {
  const now = new Date()
  const newMember: Member = {
    id: getDateTimeText(now),
    name: '新しい選手',
    publish: false,
    releaseDate: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0)
    ),
    custom: {},
    insDate: Timestamp.fromDate(now),
    thumbnail: { name: 'noImage', url: '/member_default.png' },
    tags: []
  }
  const result = insert('member', newMember, newMember.id)
  return result ? newMember : null
}

export default createMember
