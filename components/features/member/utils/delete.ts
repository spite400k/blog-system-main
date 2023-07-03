import { remove } from 'firestore/utils/remove'
import { Member } from '../types/member'

export const deleteMember = async (member: Member) => {
  const result = await remove('member', member.id)
  return result
}

export default deleteMember
