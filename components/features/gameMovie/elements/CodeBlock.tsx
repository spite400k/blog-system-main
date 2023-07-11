import { CodeComponent } from 'react-markdown/lib/ast-to-react'
import { FC, ReactNode } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'

type wrapperprops = {
  children: ReactNode
}
const CodeBlockWrapper: FC<wrapperprops> = ({ children }) => (
  <div style={{ position: 'relative' }}>{children}</div>
)

const CodeBlockTitle: FC<wrapperprops> = ({ children }) => (
  <div
    style={{
      display: 'inline-block',
      position: 'absolute',
      top: '-1em',
      left: 0,
      backgroundColor: '#ccc',
      padding: '0.2em',
      color: '#000'
    }}
  >
    {children}
  </div>
)

const CodeBlock: CodeComponent = (props) => {
  const { inline, className, children } = { ...props }
  if (inline) {
    return <code className={className}>{children}</code>
  }
  let match = /language-(\w+)(:.+)/.exec(className || '')
  let lang = match && match[1] ? match[1] : ''
  const name = match && match[2] ? match[2].slice(1) : ''
  if (name === '') {
    match = /language-(\w+)/.exec(className || '')
    lang = match && match[1] ? match[1] : ''
  }
  if (lang === 'gradle') {
    lang = 'kotlin'
  }
  return (
    <CodeBlockWrapper>
      {name && <CodeBlockTitle>{name}</CodeBlockTitle>}
      <SyntaxHighlighter style={nightOwl} language={lang}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </CodeBlockWrapper>
  )
}

export default CodeBlock
