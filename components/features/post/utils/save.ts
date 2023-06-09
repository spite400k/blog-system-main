import { update } from 'firestore/utils/update'
import { Post } from 'components/features/post/types/post'
import { errorList } from './error'
import { validatePost } from './validate'

export const savePost = async (post: Post) => {
  if (process.env.NODE_ENV === 'development') console.log(post)

  // 記事から記号のみ抜いて、見出し記事にする
  const temp = post.markdown ? post.markdown.replace(/\r?\n]*/gi, '') : ''

  post.excerpt = temp
    ? temp.replace(/[ -/:-@[-`{-~]*/gi, '').substring(0, 100) + '...'
    : ''

  // check validate
  const error = await validatePost(post)
  if (error) {
    return error
  }

  // update post
  const result = await update<Post>('post', post.id, post)

  return result ? null : errorList.update_failed
}

export default savePost
