import { update } from 'firestore/utils/update'
import { Member } from '../types/member'
import { MemberSlug } from '../types/slug'

export const updateMemberSlugs = async (
  newMember: Member,
  oldMember: Member,
  slugs: MemberSlug
) => {
  // remove old member's slug, and add new member's slug
  let newSlugs: string[] = []
  if (slugs != null) {
    newSlugs = slugs.value.filter((s: string) => s !== oldMember.slug)
  }

  newSlugs.push(newMember.slug as string)

  await update('slug', 'member', { value: newSlugs })
}
