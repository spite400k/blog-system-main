import { remove } from 'firestore/utils/remove'
import { Post } from 'components/features/post/types/post'

export const deletePost = async (post: Post) => {
  const result = await remove('post', post.id)
  return result
}

export default deletePost
