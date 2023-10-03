import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { MemberType } from '../types/member'
import { getDateTimeText } from 'shared/utils/date'

export const createMember = async () => {
  const now = new Date()
  const newMember: MemberType = {
    id: getDateTimeText(now),
    name: '新しい選手',
    publish: false,
    releaseDate: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0)
    ),
    custom: {},
    insDate: Timestamp.fromDate(now),
    thumbnail: { name: 'noImage', url: '/img/member/member_default.jpg' },
    tags: [],
    param1: 5,
    param2: 5,
    param3: 5,
    param4: 5,
    param5: 5,
    param6: 5
  }
  const result = insert('member', newMember, newMember.id)
  return result ? newMember : null
}

export default createMember
