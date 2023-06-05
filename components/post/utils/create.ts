import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { Post } from 'post/types/post'
import { getDateTimeText } from 'shared/utils/date'

export const createPost = async () => {
  const now = new Date()
  const newPost: Post = {
    id: getDateTimeText(now),
    title: '新しい投稿',
    category: '',
    slug: getDateTimeText(now),
    publish: false,
    releaseDate: Timestamp.fromDate(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 0, 0)
    ),
    custom: {},
    insDate: Timestamp.fromDate(now),
    excerpt: '',
    ogImage: { name: 'noImage', url: '/dog.png' },
    thumbnail: { name: 'noImage', url: '/dog.png' },
    tags: []
  }
  const result = insert('post', newPost, newPost.id)
  return result ? newPost : null
}

export default createPost
