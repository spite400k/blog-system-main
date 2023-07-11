import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MdImage from './MdImage'

import { Post } from 'components/features/post/types/post'
import matter from 'gray-matter'

export const PostMarkdown = (props: { post: Post }) => {
  const { content } = matter(props.post.markdown ?? '')
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock,
        img: MdImage
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
