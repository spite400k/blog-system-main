import { update } from 'firestore/utils/update'
import { Post } from 'components/features/post/types/post'
import { PostSlug } from 'components/features/post/types/slug'

export const updatePostSlugs = async (
  newPost: Post,
  oldPost: Post,
  slugs: PostSlug
) => {
  // remove old post's slug, and add new post's slug
  let newSlugs: string[] = [];
  if (slugs!=null) {
      newSlugs = slugs.value.filter((s: string) => s !== oldPost.slug)
  }
  
  newSlugs.push(newPost.slug as string)

  await update('slug', 'post', { value: newSlugs })
}
