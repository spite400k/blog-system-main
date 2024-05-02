import { MemberType } from '../../types/member'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useEffect, useRef, useState, MutableRefObject, ReactNode } from 'react'
import { useMemberEditor } from '../../hooks/useMemberEditor'
import { MemberMarkdown } from './member-markdown'
import { Box } from 'shared/elements/box/common'
import styled from 'styled-components'
import { FlexBox } from 'shared/elements/box/flex'
import { Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
import { Input } from 'shared/elements/field/input'
// import ApexChartRader from 'shared/elements/chart/rader'
import { SelectBox } from 'shared/elements/field/selectBox'
import { UploadMulti } from 'shared/elements/field/uploadMulti'

// import TextareaAutosize from 'react-textarea-autosize'
// import { Upload } from 'shared/elements/field/upload'
// import { StorageObject } from 'components/storage/types/obj'
// import { Slider } from 'shared/elements/slider/slider'

const optionsPosition = [
  { value: 'FW', label: 'FW フォワード', positionCategory: 'FW' },
  { value: 'CFW', label: 'CFW センターフォワード', positionCategory: 'FW' },
  { value: 'LW', label: 'LW 左ウィング', positionCategory: 'FW' },
  { value: 'RW', label: 'RW 右ウィング', positionCategory: 'FW' },
  { value: '', label: '－－－－－－－－－', positionCategory: '' },
  { value: 'MF', label: 'MF ミッドフィルダ', positionCategory: 'MF' },
  { value: 'TOP', label: 'TOP トップ下', positionCategory: 'MF' },
  { value: 'CH', label: 'CH センターハーフ', positionCategory: 'MF' },
  { value: 'LSH', label: 'LIH 左サイドハーフ', positionCategory: 'MF' },
  { value: 'RSH', label: 'RIH 右サイドハーフ', positionCategory: 'MF' },
  { value: 'LWB', label: 'LIH 左サイドハーフ', positionCategory: 'MF' },
  { value: 'RSH', label: 'RIH 右サイドハーフ', positionCategory: 'MF' },
  { value: 'LFW', label: 'LFW 左ウィング', positionCategory: 'MF' },
  { value: 'RFW', label: 'RFW 右ウィング', positionCategory: 'MF' },
  { value: '', label: '－－－－－－－－－', positionCategory: '' },
  { value: 'DF', label: 'DF ディフェンダ', positionCategory: 'DF' },
  { value: 'CB', label: 'CB センターバック', positionCategory: 'DF' },
  { value: 'LSB', label: 'LSB 左サイドバック', positionCategory: 'DF' },
  { value: 'RSB', label: 'RSB 右サイドバック', positionCategory: 'DF' },
  { value: '', label: '－－－－－－－－－', positionCategory: '' },
  { value: 'GK', label: 'ゴールキーパー', positionCategory: 'GK' },
  { value: '', label: '－－－－－－－－－', positionCategory: '' },
  { value: 'OTHERS', label: 'その他', positionCategory: 'OTHERS' }
]

// const optionsFoot = [
//   { value: '右', label: '右' },
//   { value: '左', label: '左' }
// ]

export const MemberEditor = (props: {
  member: MemberType
  isPreview: boolean
}) => {
  const { isPreview, uploadInfo, onInsertImgMarkdown } = useMemberEditor()
  const { theme } = useTheme()

  const areaLeavePos = useRef(
    props.member.markdown ? props.member.markdown.length : 0
  )
  const areaRef = useRef() as MutableRefObject<HTMLDivElement>
  // マークダウンタブ追加
  const [, setMarkdown] = useState<string>(props.member.markdown ?? '')

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
      {/* 記入領域 */}
      <BorderBox
        width={'100%'}
        height={'100%'}
        borderPosition={'all'}
        borderColor={theme.color.gray05}
        borderWidth={'2px'}
        borderStyle={'solid'}
        radius={'12px'}
        // overflow={'hidden'}
      >
        <ColorBox
          width={'100%'}
          height={'100%'}
          background={theme.color.base}
          position={'relative'}
        >
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
                {props.member.name}
                {props.member.nameEnglish}
                {props.member.number}
                {props.member.position}
                {props.member.thumbnail?.url}
                <MemberMarkdown member={props.member} />
              </Box>
            </TransformBox>
          </ColorBox>
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
                  // overflow={'hidden'}
                >
                  <TopField title={''}>
                    <SelectBox
                      values={optionsPosition}
                      defaultValue={
                        optionsPosition.filter(
                          (c) => c.value === props.member.position
                        ).length > 0
                          ? optionsPosition.filter(
                              (c) => c.value === props.member.position
                            )[0]
                          : optionsPosition[0]
                      }
                      onChange={(s) => {
                        const position = optionsPosition.filter(
                          (c) => c.value === s
                        )[0]
                        props.member.position = position.value
                        props.member.positionCategory =
                          position.positionCategory
                      }}
                    />
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'選手の写真'}></TopField>
                {/* <Upload
                  folder={'image'}
                  name={image ? image.name : undefined}
                  url={image ? image.url : undefined}
                  onUpload={(info) => setMemberImages(info)}
                /> */}
                <UploadMulti images={null} />
              </FlexBox>
            </ColorBox>

            {/* <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'利き足'}></TopField>
                <BorderBox
                  width={'100%'}
                  height={'100%'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  // overflow={'hidden'}
                >
                  <TopField title={''}>
                    <SelectBox
                      values={optionsFoot}
                      defaultValue={
                        optionsFoot.filter((c) => c.value === props.member.foot)
                          .length > 0
                          ? optionsFoot.filter(
                              (c) => c.value === props.member.foot
                            )[0]
                          : optionsFoot[0]
                      }
                      onChange={(s) => {
                        const foot = optionsFoot.filter((c) => c.value === s)[0]
                        props.member.foot = foot.value
                      }}
                    />
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
                <TopField title={'身長'}></TopField>
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
                      defaultValue={props.member.height}
                      onChange={(e) =>
                        (props.member.height = Number(e.target.value))
                      }
                    />{' '}
                  </TopField>
                </BorderBox>
              </FlexBox>
            </ColorBox> */}

            {/*             
            <ColorBox
              background={theme.color.base}
              width={'100%'}
              padding={'1em'}
              radius={'16px'}
              shrink={'0'}
              hover={{ background: theme.color.gray06 }}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'体重'}></TopField>
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
                      defaultValue={props.member.weight}
                      onChange={(e) =>
                        (props.member.weight = Number(e.target.value))
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
                <TopField title={'血液型'}></TopField>
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
                      defaultValue={props.member.bloodType}
                      onChange={(e) =>
                        (props.member.bloodType = e.target.value)
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
                <TopField title={'誕生日'}></TopField>
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
                      defaultValue={props.member.birthday}
                      onChange={(e) => (props.member.birthday = e.target.value)}
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
                  height={'auto'}
                  borderPosition={'bottom'}
                  borderColor={theme.color.gray01}
                  borderWidth={'2px'}
                  borderStyle={'solid'}
                  radius={'1px'}
                  // overflow={'hidden'}
                >
                  <TopField title={''}>
                    <TextareaAutosize
                      minRows={3}
                      style={{ width: '100%' }}
                      defaultValue={props.member.playerExplain ?? ''}
                      onChange={(e) =>
                        (props.member.playerExplain = e.target.value ?? '')
                      }
                    />
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
                <TopField title={'能力パラメータ'}></TopField>
                <FlexBox way={'row'} width={'100%'} gap={'10em'}>
                  <BorderBox
                    width={'60%'}
                    height={'100%'}
                    borderPosition={'bottom'}
                    borderColor={theme.color.gray01}
                    borderWidth={'2px'}
                    borderStyle={'solid'}
                    radius={'1px'}
                    overflow={'hidden'}
                  >
                    <TopField title={'Tactics'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param1}
                        onChange={(e) =>
                          (props.member.param1 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>

                    <TopField title={'Kick'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param2}
                        onChange={(e) =>
                          (props.member.param2 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>

                    <TopField title={'Dribble'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param3}
                        onChange={(e) =>
                          (props.member.param3 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>

                    <TopField title={'Ball control'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param4}
                        onChange={(e) =>
                          (props.member.param4 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>

                    <TopField title={'Physical'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param5}
                        onChange={(e) =>
                          (props.member.param5 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>

                    <TopField title={'Carrer'}>
                      <Input
                        width={'50%'}
                        padding={'1em 0.5em'}
                        background={theme.color.base}
                        border={{ radius: '6px' }}
                        defaultValue={props.member.param6}
                        onChange={(e) =>
                          (props.member.param6 = Number(e.target.value))
                        }
                        align={'right'}
                      />{' '}
                    </TopField>
                  </BorderBox>

                  <ApexChartRader member={props.member} />
                </FlexBox>
              </FlexBox>
            </ColorBox> */}
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
