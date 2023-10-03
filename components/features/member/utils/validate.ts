import { Notification } from 'components/notification/types/notification'
import { MemberType } from '../types/member'
import { MemberSlug } from '../types/slug'
import { errorList } from './error'

export const validateMember = async (
  p: MemberType,
  onSuccess?: (slugs: MemberSlug) => void
): Promise<Notification | null> => {
  // empty name
  if (p.name === '' || p.name === null || p.name === undefined) {
    return errorList.name_is_empty
  }

  // empty number
  // if (p.number === '' || p.number === null || p.number === undefined) {
  //   return errorList.number_is_empty
  // }

  // empty position
  // if (p.position === '' || p.position === null || p.position === undefined) {
  //   return errorList.position_is_empty
  // }

  // same number
  // // const slugs = (await take<MemberSlug>('slug', 'member')) as MemberSlug
  // // const oldMember = (await take<Member>('member', p.id)) as Member

  // // if (
  // //   slugs != null &&
  // //   slugs.value.indexOf(p.slug ?? '') >= 0 &&
  // //   oldMember.slug !== p.slug
  // // ) {
  // //   return errorList.same_slug_exist
  // // }

    // empty number
  if (p.param1 === null || p.param1 === undefined || p.param1 > 5 || p.param1 < 0 || !Number.isInteger(p.param1)) {
    return errorList.param_is_over
  }

  // // after validate, update slugs for validation
  // await updateMemberSlugs(p, oldMember, slugs)

  return null
}
