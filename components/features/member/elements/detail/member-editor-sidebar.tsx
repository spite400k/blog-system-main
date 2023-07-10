import { Member } from '../../types/member'
import { useEffect, useState, ReactNode } from 'react'
import { Box } from 'shared/elements/box/common'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Switch } from 'shared/elements/field/switch'
import { Sentence, Word } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Image } from 'shared/elements/image/common'
import { Calendar } from 'shared/elements/calendar/calendar'
import { TransformBox } from 'shared/elements/box/transform'
import { CursorBox } from 'shared/elements/box/cursor'
import { getDateText, getTimeText } from 'shared/utils/date'
import { useMemberEditor } from '../../hooks/useMemberEditor'
import { Timestamp } from 'firebase/firestore'
import { Upload } from 'shared/elements/field/upload'
import { StorageObject } from 'components/storage/types/obj'
import { Category } from 'components/category/types/category'

export const MemberEditorSidebar = (props: {
  member: Member
  categories: Category[]
  isPreview: boolean
  onSetPreviewMode: (state: boolean) => void
}) => {
  const { theme } = useTheme()
  const [isPublish, setPublish] = useState(props.member.publish)
  const [isCalendarVisible, setCalendarVisible] = useState(false)
  const [thumbnail, setThumbnail] = useState<StorageObject | null>(
    props.member.thumbnail ?? null
  )
  const [releaseDate, setReleaseDate] = useState<Date>(
    props.member.releaseDate ? props.member.releaseDate.toDate() : new Date()
  )
  const editor = useMemberEditor()

  useEffect(() => {
    props.member.publish = isPublish
  }, [isPublish, props.member])

  useEffect(() => {
    props.member.releaseDate = Timestamp.fromDate(releaseDate)
  }, [releaseDate, props.member])

  useEffect(() => {
    if (thumbnail) props.member.thumbnail = thumbnail
  }, [thumbnail, props.member])

  return (
    <FlexBox
      way={'column'}
      gap={'1em'}
      minWidth={'360px'}
      width={'20vw'}
      height={'100%'}
    >
      <ColorBox
        background={theme.color.gray06}
        width={'100%'}
        padding={'1em'}
        radius={'16px'}
        shrink={'0'}
      >
        <FlexBox way={'column'} width={'100%'} gap={'1em'}>
          <TopField title={'プレビューモード'}>
            <Switch
              state={editor.isPreview}
              onSwitch={(state) => editor.onTogglePreview()}
            />
          </TopField>
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
          <Upload
            folder={'thumbnail'}
            name={thumbnail ? thumbnail.name : undefined}
            url={thumbnail ? thumbnail.url : undefined}
            onUpload={(info) => setThumbnail(info)}
          />
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
          <TopField title={'公開設定'}>
            <Switch
              state={isPublish}
              onSwitch={(state) => setPublish(!isPublish)}
            />
          </TopField>
          <TopField title={'公開日'}>
            <ColorBox position={'absolute'} opacity={isCalendarVisible ? 1 : 0}>
              <TransformBox
                position={'absolute'}
                transform={
                  isCalendarVisible
                    ? 'translate(-110%, -50%)'
                    : 'translate(-105%, -50%)'
                }
              >
                <Calendar
                  date={releaseDate}
                  onChange={(d) => setReleaseDate(d)}
                />
              </TransformBox>
            </ColorBox>
            <CursorBox cursor={'pointer'}>
              <ColorBox
                background={theme.color.base}
                radius={'8px'}
                padding={'0.75em 1em'}
                onClick={() => setCalendarVisible(!isCalendarVisible)}
              >
                <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                  <Image
                    width={'30px'}
                    height={'30px'}
                    src={'/calendar.png'}
                    fit={'contain'}
                  />
                  <Word size={moduler(-1)} weight={'600'}>{`${getDateText(
                    releaseDate
                  )} ${getTimeText(releaseDate)}`}</Word>
                </FlexBox>
              </ColorBox>
            </CursorBox>
          </TopField>
        </FlexBox>
      </ColorBox>
    </FlexBox>
  )
}

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
