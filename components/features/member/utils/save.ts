import { update } from 'firestore/utils/update'
import { MemberType } from '../types/member'
import { errorList } from './error'
import { validateMember } from './validate'

export const saveMember = async (member: MemberType) => {
  if (process.env.NODE_ENV === 'development') console.log(member)

  // check validate
  const error = await validateMember(member)
  if (error) {
    return error
  }

  // update member
  const result = await update<MemberType>('member', member.id, member)

  return result ? null : errorList.update_failed
}

export default saveMember
