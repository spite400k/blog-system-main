import { Member } from '../../types/member'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, MutableRefObject, ReactNode } from 'react'
import { useMemberEditor } from '../../hooks/useMemberEditor'
import { MemberMarkdown } from './member-markdown'
import { Box } from 'shared/elements/box/common'
import 'easymde/dist/easymde.min.css'
import styled from 'styled-components'
// import SimpleMde from "react-simplemde-editor";
import dynamic from 'next/dynamic'
import { FlexBox } from 'shared/elements/box/flex'
import { Sentence, Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
import { Input } from 'shared/elements/field/input'
const SimpleMde = dynamic(() => import('react-simplemde-editor'), {
  ssr: false
})

export const MemberEditor = (props: { member: Member; isPreview: boolean }) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = useMemberEditor()
  const { theme } = useTheme()
  const areaLeavePos = useRef(
    props.member.markdown ? props.member.markdown.length : 0
  )
  const areaRef = useRef() as MutableRefObject<HTMLDivElement>
  // マークダウンタブ追加
  const [, setMarkdown] = useState<string>(props.member.markdown ?? '')

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

  const editor = useMemberEditor()

  const uploadImage = async (file: File) => {
    try {
      // 画像アップロード処理を実行
      editor.onUploadImage(file)
    } catch (error) {}
  }

  useEffect(() => {
    setMarkdown(props.member.markdown ?? '')
  }, [isPreview])

  useEffect(() => {
    const newMarkdown = onInsertImgMarkdown(
      props.member.markdown ?? '',
      areaRef.current,
      areaLeavePos.current
    )
    props.member.markdown = newMarkdown
    setMarkdown(props.member.markdown)
  }, [uploadInfo])

  return (
    <MemberEditorBox background={theme.color.gray06}>
      {/* プレビュー領域 */}
      <ColorBox
        width={'100%'}
        height={'100%'}
        padding={'0 4em'}
        position={'absolute'}
        opacity={isPreview ? 1 : 0}
        // overflowY={isPreview ? 'scroll' : 'hidden'}
      >
        <TransformBox
          width={'100%'}
          height={'100%'}
          transform={isPreview ? 'translateY(0)' : 'translateY(1em)'}
        >
          <Box width={'100%'} padding={'2em 0 0 0'}>
            <MemberMarkdown member={props.member} />
          </Box>
        </TransformBox>
      </ColorBox>

      {/* 記入領域 */}
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
            // padding={'0 1em'}
            position={'absolute'}
            opacity={isPreview ? 0 : 1}
            // overflowY={isPreview ? 'hidden' : 'scroll'}
          >
            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'選手名'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  overflow={'hidden'}
                >
                  <TopField title={''}>
                    <Input
                      width={'100%'}
                      padding={'1em 0.5em'}
                      background={theme.color.base}
                      border={{ radius: '6px' }}
                      defaultValue={props.member.name}
                      onChange={(e) => (props.member.name = e.target.value)}
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'選手名(英語)'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  overflow={'hidden'}
                >
                  <TopField title={''}>
                    <Input
                      width={'100%'}
                      padding={'1em 0.5em'}
                      background={theme.color.base}
                      border={{ radius: '6px' }}
                      defaultValue={props.member.nameEnglish}
                      onChange={(e) =>
                        (props.member.nameEnglish = e.target.value)
                      }
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'背番号'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  overflow={'hidden'}
                >
                  <TopField title={''}>
                    <Input
                      width={'100%'}
                      padding={'1em 0.5em'}
                      background={theme.color.base}
                      border={{ radius: '6px' }}
                      defaultValue={props.member.number}
                      onChange={(e) => (props.member.number = e.target.value)}
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'ポジション'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  overflow={'hidden'}
                >
                  <TopField title={''}>
                    <Input
                      width={'100%'}
                      padding={'1em 0.5em'}
                      background={theme.color.base}
                      border={{ radius: '6px' }}
                      defaultValue={props.member.position}
                      onChange={(e) => (props.member.position = e.target.value)}
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>
            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'選手説明'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  overflow={'hidden'}
                >
                  <TopField title={''}>
                    <Input
                      width={'100%'}
                      padding={'1em 0.5em'}
                      background={theme.color.base}
                      border={{ radius: '6px' }}
                      defaultValue={props.member.markdown}
                      onChange={(e) => (props.member.markdown = e.target.value)}
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>
          </ColorBox>
        </ColorBox>
      </BorderBox>
    </MemberEditorBox>
  )
}

const MemberEditorBox = styled.div<{ background: string }>`
  width: 100%;
  height: 100%;
  padding: 2em;
  min-width: 40vw;
  border-radius: 15px;
  background: ${(props) => props.background};
  // border: solid 3px #131315;
  // text-align: center;
  // white-space: pre-wrap;
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

const BottomField = (props: {
  title: string
  description: string
  children?: ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <ColorBox
      background={theme.color.base}
      width={'100%'}
      padding={'1em'}
      radius={'12px'}
      shrink={'0'}
    >
      <FlexBox way={'column'} width={'100%'} gap={'2px'}>
        <Word weight={'600'} size={moduler(-2)} color={theme.color.main}>
          {props.title}
        </Word>
        <Sentence size={moduler(-3)} color={theme.color.gray01}>
          {props.description}
        </Sentence>
        <Box width={'100%'} margin={'12px 0 0 0'}>
          {props.children}
        </Box>
      </FlexBox>
    </ColorBox>
  )
}
