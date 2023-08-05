import { Timestamp } from 'firebase/firestore'
import { insert } from 'firestore/utils/insert'
import { Post } from 'components/features/post/types/post'
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
    ogImage: { name: 'noImage', url: '/img/blog/write.svg' },
    thumbnail: { name: 'noImage', url: '/img/blog/write.svg' },
    tags: []
  }
  const result = insert('post', newPost, newPost.id)
  return result ? newPost : null
}

export default createPost
