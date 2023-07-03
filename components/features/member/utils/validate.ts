import { Notification } from 'components/notification/types/notification'
import { take } from 'firestore/utils/take'
import { Member } from '../types/member'
import { MemberSlug } from '../types/slug'
import { errorList } from './error'
import { updateMemberSlugs } from './slug'

export const validateMember = async (
  p: Member,
  onSuccess?: (slugs: MemberSlug) => void
): Promise<Notification | null> => {
  // empty title
  if (p.title === '' || p.title === null || p.title === undefined) {
    return errorList.title_is_empty
  }

  // empty slug
  if (p.slug === '' || p.slug === null || p.slug === undefined) {
    return errorList.slug_is_empty
  }

  // same slug
  const slugs = (await take<MemberSlug>('slug', 'member')) as MemberSlug
  const oldMember = (await take<Member>('member', p.id)) as Member

  if (
    slugs != null &&
    slugs.value.indexOf(p.slug ?? '') >= 0 &&
    oldMember.slug !== p.slug
  ) {
    return errorList.same_slug_exist
  }

  // after validate, update slugs for validation
  await updateMemberSlugs(p, oldMember, slugs)

  return null
}
