import { MemberType } from '../types/member'
import { MemberScheduleRequest } from '../types/schedule'

export const schedule = async (member: MemberType) => {
  const reqData: MemberScheduleRequest = {
    id: member.id,
    name: member.name ?? '',
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

export const refresh = async (member: MemberType) => {
  const reqData = {
    id: member.id ?? '',
    name: member.name ?? '',
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
