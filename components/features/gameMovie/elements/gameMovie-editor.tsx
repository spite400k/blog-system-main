import { GameMovie } from '../types/gameMovie'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, MutableRefObject, ReactNode } from 'react'
import { useGameMovieEditor } from '../hooks/useGameMovieEditor'
import { GameMovieMarkdown } from './gameMovie-markdown'
import { Box } from 'shared/elements/box/common'
import 'easymde/dist/easymde.min.css'
import styled from 'styled-components'
// import SimpleMde from "react-simplemde-editor";
import dynamic from 'next/dynamic'
import { FlexBox } from 'shared/elements/box/flex'
import { Input } from 'shared/elements/field/input'
import { Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
const SimpleMde = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

export const GameMovieEditor = (props: {
  gameMovie: GameMovie
  isPreview: boolean
}) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = useGameMovieEditor()
  const { theme } = useTheme()
  const areaLeavePos = useRef(
    props.gameMovie.markdown ? props.gameMovie.markdown.length : 0
  )
  const areaRef = useRef() as MutableRefObject<HTMLDivElement>
  // マークダウンタブ追加
  const [, setMarkdown] = useState<string>(props.gameMovie.markdown ?? '')

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

  const editor = useGameMovieEditor()

  const uploadImage = async (file: File) => {
    try {
      // 画像アップロード処理を実行
      editor.onUploadImage(file)
    } catch (error) {}
  }

  useEffect(() => {
    setMarkdown(props.gameMovie.markdown ?? '')
  }, [isPreview])

  useEffect(() => {
    const newMarkdown = onInsertImgMarkdown(
      props.gameMovie.markdown ?? '',
      areaRef.current,
      areaLeavePos.current
    )
    props.gameMovie.markdown = newMarkdown
    setMarkdown(props.gameMovie.markdown)
  }, [uploadInfo])

  return (
    <GameMovieEditorBox background={theme.color.gray06}>
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
            background={theme.color.gray06}
            width={'100%'}
            padding={'1em'}
            // radius={'16px'}
            shrink={'0'}
          >
            <FlexBox way={'column'} width={'100%'} gap={'1em'}>
              <TopField title={'動画URL'}>
                <Input
                  width={'100%'}
                  padding={'1em 0.5em'}
                  background={theme.color.base}
                  border={{ radius: '6px' }}
                  defaultValue={props.gameMovie.videoUrl}
                  onChange={(e) => (props.gameMovie.videoUrl = e.target.value)}
                />{' '}
              </TopField>
            </FlexBox>
          </ColorBox>
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
                <GameMovieMarkdown gameMovie={props.gameMovie} />
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
                value={props.gameMovie.markdown ?? ''}
                onChange={(value) => (props.gameMovie.markdown = value)}
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
    </GameMovieEditorBox>
  )
}

const GameMovieEditorBox = styled.div<{ background: string }>`
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
const TopField = (props: { title: string; children?: ReactNode }) => {
  const { theme } = useTheme()
  return (
    <FlexBox
      way={'row'}
      width={'100%'}
      alignItems={'center'}
      justifyContent={'space-between'}
      position={'relative'}
    >
      <Word weight={'600'} size={moduler(-2)} color={theme.color.main}>
        {props.title}
      </Word>
      {props.children}
    </FlexBox>
  )
}
