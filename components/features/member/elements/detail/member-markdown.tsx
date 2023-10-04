import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MdImage from './MdImage'

import { MemberType } from '../../types/member'
import matter from 'gray-matter'

export const MemberMarkdown = (props: { member: MemberType }) => {
  const { content } = matter(props.member.markdown ?? '')
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
