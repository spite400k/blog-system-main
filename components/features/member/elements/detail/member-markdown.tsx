import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MdImage from './MdImage'

import { Member } from '../../types/member'
import matter from 'gray-matter'

export const MemberMarkdown = (props: { member: Member }) => {
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
