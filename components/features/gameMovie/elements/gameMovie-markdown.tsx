import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import MdImage from './MdImage'

import { GameMovie } from '../types/gameMovie'
import matter from 'gray-matter'

export const GameMovieMarkdown = (props: { gameMovie: GameMovie }) => {
  const { content } = matter(props.gameMovie.markdown ?? '')
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
