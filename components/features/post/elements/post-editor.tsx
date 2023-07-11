import { Post } from 'components/features/post/types/post'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, MutableRefObject } from 'react'
import { usePostEditor } from 'components/features/post/hooks/usePostEditor'
import { PostMarkdown } from './post-markdown'
import { Box } from 'shared/elements/box/common'
import 'easymde/dist/easymde.min.css'
import styled from 'styled-components'
// import SimpleMde from "react-simplemde-editor";
import dynamic from 'next/dynamic'
const SimpleMde = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

export const PostEditor = (props: { post: Post; isPreview: boolean }) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = usePostEditor()
  const { theme } = useTheme()
  const areaLeavePos = useRef(
    props.post.markdown ? props.post.markdown.length : 0
  )
  const areaRef = useRef() as MutableRefObject<HTMLDivElement>
  // マークダウンタブ追加
  const [, setMarkdown] = useState<string>(props.post.markdown ?? '')

  // 画像をアップロードする処理
  const imageUploadFunction = (file: File) => {
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/heic' ||
      file.type === 'image/gif'
    ) {
      // const file = files[0]
      const uploadedImageUrl = uploadImage(file)
      // アップロードしたURLを取得してマークダウンに埋め込む
      setMarkdown((preMarkdown) => {
        return preMarkdown + `![image](${uploadedImageUrl})`
      })
    }
  }

  const editor = usePostEditor()

  const uploadImage = async (file: File) => {
    try {
      // 画像アップロード処理を実行
      editor.onUploadImage(file)
    } catch (error) {}
  }

  useEffect(() => {
    setMarkdown(props.post.markdown ?? '')
  }, [isPreview])

  useEffect(() => {
    const newMarkdown = onInsertImgMarkdown(
      props.post.markdown ?? '',
      areaRef.current,
      areaLeavePos.current
    )
    props.post.markdown = newMarkdown
    setMarkdown(props.post.markdown)
  }, [uploadInfo])

  return (
    <PostEditorBox background={theme.color.gray06}>
      <BorderBox
        width={'100%'}
        height={'100%'}
        borderPosition={'all'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        radius={'12px'}
        overflow={'hidden'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          background={theme.color.base}
          position={'relative'}
        >
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 1 : 0}
            overflowY={isPreview ? 'scroll' : 'hidden'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(0)' : 'translateY(1em)'}
            >
              <Box width={'100%'} padding={'2em 0 0 0'}>
                <PostMarkdown post={props.post} />
              </Box>
            </TransformBox>
          </ColorBox>
          <ColorBox
            width={'100%'}
            height={'100%'}
            padding={'0 4em'}
            position={'absolute'}
            opacity={isPreview ? 0 : 1}
            overflowY={isPreview ? 'hidden' : 'scroll'}
          >
            <TransformBox
              width={'100%'}
              height={'100%'}
              transform={isPreview ? 'translateY(1em)' : 'translateY(0)'}
            >
              <SimpleMde
                value={props.post.markdown ?? ''}
                onChange={(value) => (props.post.markdown = value)}
                ref={areaRef}
                options={{
                  toolbar: [
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'bold',
                    'italic',
                    'heading',
                    'strikethrough',
                    'code',
                    '|',
                    'quote',
                    'unordered-list',
                    'ordered-list',
                    'table',
                    'horizontal-rule',
                    '|',
                    'link'
                  ],
                  minHeight: '500px',
                  autofocus: true,
                  spellChecker: false,
                  uploadImage: true,
                  imageUploadFunction
                }}
              />
            </TransformBox>
          </ColorBox>
        </ColorBox>
      </BorderBox>
    </PostEditorBox>
  )
}

const PostEditorBox = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  padding: 2em;
  min-width: 40vw;
  border-radius: 15px;
  background: ${(props) => props.background};
  // border: solid 3px #131315;
  text-align: center;
  white-space: pre-wrap;
`
