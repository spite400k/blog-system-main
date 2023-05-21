import { Post } from 'post/types/post'
import { PostScheduleRequest } from 'post/types/schedule'

export const schedule = async (post: Post) => {
  const reqData: PostScheduleRequest = {
    id: post.id,
    title: post.title ?? '',
    releaseDate: post.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/post/isr/schedule', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}

export const refresh = async (post: Post) => {
  const reqData = {
    category: post.category ?? '',
    id: post.id ?? '',
    title: post.title ?? '',
    slug: post.slug,
    releaseDate: post.releaseDate.toDate().toString()
  }
  await fetch('/api/admin/post/isr/refresh', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(reqData)
  })
}
