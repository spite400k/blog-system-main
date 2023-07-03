import { Member } from '../types/member'
import { MemberScheduleRequest } from '../types/schedule'

export const schedule = async (member: Member) => {
  const reqData: MemberScheduleRequest = {
    id: member.id,
    title: member.title ?? '',
    releaseDate: member.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/member/isr/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}

export const refresh = async (member: Member) => {
  const reqData = {
    category: member.category ?? '',
    id: member.id ?? '',
    title: member.title ?? '',
    slug: member.slug,
    releaseDate: member.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/member/isr/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
