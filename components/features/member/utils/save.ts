import { update } from 'firestore/utils/update'
import { Member } from '../types/member'
import { errorList } from './error'
import { validateMember } from './validate'

export const saveMember = async (member: Member) => {
  if (process.env.NODE_ENV === 'development') console.log(member)

  // 記事から記号のみ抜いて、見出し記事にする
  const temp = member.markdown ? member.markdown.replace(/\r?\n]*/gi, '') : ''

  member.excerpt = temp
    ? temp.replace(/[ -/:-@[-`{-~]*/gi, '').substring(0, 100) + '...'
    : ''

  // check validate
  const error = await validateMember(member)
  if (error) {
    return error
  }

  // update member
  const result = await update<Member>('member', member.id, member)

  return result ? null : errorList.update_failed
}

export default saveMember
