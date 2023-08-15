import { CalendarType } from '../../types/calendar'
import { useEffect, useState, ReactNode } from 'react'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { Switch } from 'shared/elements/field/switch'
import { Word } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { Image } from 'shared/elements/image/common'
import { Calendar } from 'shared/elements/calendar/calendar'
import { TransformBox } from 'shared/elements/box/transform'
import { CursorBox } from 'shared/elements/box/cursor'
import { getDateText, getTimeText } from 'shared/utils/date'
import { useCalendarEditor } from '../../hooks/useCalendarEditor'
import { Timestamp } from 'firebase/firestore'
import { Category } from 'components/category/types/category'

export const CalendarEditorSidebar = (props: {
  calendar: CalendarType
  categories: Category[]
  isPreview: boolean
  onSetPreviewMode: (state: boolean) => void
}) => {
  const { theme } = useTheme()
  const [isPublish, setPublish] = useState(props.calendar.publish)
  const [isCalendarVisible, setCalendarVisible] = useState(false)

  const [releaseDate, setReleaseDate] = useState<Date>(
    props.calendar.releaseDate ? props.calendar.releaseDate.toDate() : new Date()
  )
  const editor = useCalendarEditor()

  useEffect(() => {
    props.calendar.publish = isPublish
  }, [isPublish, props.calendar])

  useEffect(() => {
    props.calendar.releaseDate = Timestamp.fromDate(releaseDate)
  }, [releaseDate, props.calendar])

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
                  ? 'translate(0%, 10%)'
                  : 'translate(5%, 10%)'
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
