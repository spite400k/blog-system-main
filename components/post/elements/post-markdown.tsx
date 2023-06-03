import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MdImage from './MdImage'

import { Post } from 'post/types/post'
import matter from 'gray-matter'

export const PostMarkdown = (props: { post: Post }) => {
  const [, setMarkdown] = useState('')

  useEffect(() => {
    fetch(`/articles/test.md`)
      .then((m) => {
        return m.text()
      })
      .then((md) => {
        setMarkdown(md)
      })
  }, [])

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
