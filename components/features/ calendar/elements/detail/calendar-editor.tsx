import { ReactNode, useEffect, useState } from 'react'
import { CalendarType } from '../../types/calendar'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { useTheme } from 'shared/hooks/useTheme'
import { TransformBox } from 'shared/elements/box/transform'
import { useCalendarEditor } from '../../hooks/useCalendarEditor'
import { Box } from 'shared/elements/box/common'
import styled from 'styled-components'
import { FlexBox } from 'shared/elements/box/flex'
import { Word } from 'shared/elements/text/common'
import { moduler } from 'shared/utils/styles'
import { Calendar } from 'shared/elements/calendar/calendar'
import { CursorBox } from 'shared/elements/box/cursor'
import { getDateText, getTimeText } from 'shared/utils/date'
import { Image } from 'shared/elements/image/common'
import { Input } from 'shared/elements/field/input'
import { Area } from 'shared/elements/field/area'
import { Timestamp } from 'firebase/firestore'
import { Select } from 'shared/elements/field/select'

export const colorList = [
  {name:'赤', value:'red'},
  {name:'青', value:'blue'},
  {name:'黄', value:'yellow'},
  {name:'黒', value:'black'},
  {name:'白', value:'white'},
]



export const CalendarEditor = (props: { calendar: CalendarType; isPreview: boolean }) => {
  const { isPreview } = useCalendarEditor()
  const [isCalendarVisibleStart, setCalendarVisibleStart] = useState(false)
  const [isCalendarVisibleEnd, setCalendarVisibleEnd] = useState(false)
  const { theme } = useTheme()
  const [start, setStart] = useState<Date>(
    props.calendar.start
      ? props.calendar.start.toDate()
      : new Date()
  )
  const [end, setEnd] = useState<Date>(
    props.calendar.end
      ? props.calendar.end.toDate()
      : new Date()
  )
  useEffect(() => {
    props.calendar.start = Timestamp.fromDate(start)
  }, [start, props.calendar])
  useEffect(() => {
    props.calendar.end = Timestamp.fromDate(end)
  }, [end, props.calendar])

  return (
    <CalendarEditorBox background={theme.color.gray06}>
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
                {props.calendar.title}
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
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                <TopField title={'タイトル'}>
                  <Input
                    width={'100%'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.calendar.title}
                    onChange={(e) => (props.calendar.title = e.target.value)}
                  />{' '}
                </TopField>
              </FlexBox>
            </ColorBox>


            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'row'} width={'100%'} gap={'1em'}>

                <ColorBox
                  background={theme.color.gray06}
                  width={'50%'}
                  padding={'1em'}
                  radius={'16px'}
                  shrink={'0'}
                  hover={{ background: theme.color.base }}
                  zIndex={'1000'}
                >
                  <FlexBox way={'column'} width={'100%'} gap={'1em'}>
                    <TopField title={'予定開始日'}>
                    <ColorBox position={'absolute'} opacity={isCalendarVisibleStart ? 1 : 0}>
                      <TransformBox
                        position={'absolute'}
                        transform={
                          isCalendarVisibleStart
                            ? 'translate(20%, 10%)'
                            : 'translate(25%, 10%)'
                        }
                      >
                        <Calendar
                          date={start}
                          onChange={(d) => setStart(d)}
                          isUseTime={true}

                        />
                      </TransformBox>
                    </ColorBox>
                    <CursorBox cursor={'pointer'}>
                      <ColorBox
                        background={theme.color.base}
                        radius={'8px'}
                        padding={'0.75em 1em'}
                        onClick={() => setCalendarVisibleStart(!isCalendarVisibleStart)}
                      >
                        <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                          <Image
                            width={'30px'}
                            height={'30px'}
                            src={'/calendar.png'}
                            fit={'contain'}
                          />
                          <Word size={moduler(-1)} weight={'600'}>{`${getDateText(
                            start
                            )} ${getTimeText(start)}`}</Word>
                          </FlexBox>
                        </ColorBox>
                      </CursorBox>
                    </TopField>
                    
                  </FlexBox>
                </ColorBox>
                <ColorBox
                  background={theme.color.gray06}
                  width={'50%'}
                  padding={'1em'}
                  radius={'16px'}
                  shrink={'0'}
                  hover={{ background: theme.color.base }}
                  zIndex={'1000'}
                >
                  <FlexBox way={'column'} width={'100%'} gap={'1em'} >
                    <TopField title={'予定終了日'}>
                    <ColorBox position={'absolute'} opacity={isCalendarVisibleEnd ? 1 : 0}>
                        <TransformBox
                        position={'absolute'}
                        transform={
                          isCalendarVisibleEnd
                          ? 'translate(20%, 10%)'
                          : 'translate(25%, 10%)'
                        }
                      >
                        <Calendar
                          date={end}
                          onChange={(d) => setEnd(d)}
                          isUseTime={true}
                        />
                      </TransformBox>
                    </ColorBox>
                    <CursorBox cursor={'pointer'}>
                      <ColorBox
                        background={theme.color.base}
                        radius={'8px'}
                        padding={'0.75em 1em'}
                        onClick={() => setCalendarVisibleEnd(!isCalendarVisibleEnd)}
                      >
                        <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                          <Image
                            width={'30px'}
                            height={'30px'}
                            src={'/calendar.png'}
                            fit={'contain'}
                          />
                          <Word size={moduler(-1)} weight={'600'}>{`${getDateText(
                            end
                            )} ${getTimeText(end)}`}</Word>
                          </FlexBox>
                        </ColorBox>
                      </CursorBox>
                    </TopField>
                  </FlexBox>
                </ColorBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'row'} width={'100%'} gap={'1em'}>

                <ColorBox
                  background={theme.color.gray06}
                  width={'50%'}
                  padding={'1em'}
                  radius={'16px'}
                  shrink={'0'}
                  hover={{ background: theme.color.base }}
                  // zIndex={'1000'}
                >
                  <TopField title={'背景色'}>
                    <Select
                      values={colorList.map((c) => c.name)}
                      defaultValue={
                        colorList.filter((c) => c.value === props.calendar.backgroundColor)
                          .length > 0
                          ? colorList.filter(
                              (c) => c.value === props.calendar.backgroundColor
                            )[0].name
                          : ''
                      }
                      onChange={(s) => {
                        const category = colorList.filter(
                          (c) => c.name === s
                        )[0]
                        props.calendar.backgroundColor = category.value
                      }}
                    />
                  </TopField>
                </ColorBox>
                <ColorBox
                  background={theme.color.gray06}
                  width={'50%'}
                  padding={'1em'}
                  radius={'16px'}
                  shrink={'0'}
                  hover={{ background: theme.color.base }}
                  // zIndex={'1000'}
                >
                  <TopField title={'枠色'}>
                  <Select
                      values={colorList.map((c) => c.name)}
                      defaultValue={
                        colorList.filter((c) => c.value === props.calendar.borderColor)
                          .length > 0
                          ? colorList.filter(
                              (c) => c.value === props.calendar.borderColor
                            )[0].name
                          : ''
                      }
                      onChange={(s) => {
                        const category = colorList.filter(
                          (c) => c.name === s
                        )[0]
                        props.calendar.borderColor = category.value
                      }}
                    />
                  </TopField>
                </ColorBox>
              </FlexBox>
            </ColorBox>

            <ColorBox
              background={theme.color.gray06}
              width={'100%'}
              padding={'1em'}
              // radius={'16px'}
              shrink={'0'}
            >
              <FlexBox way={'column'} width={'100%'} gap={'1em'} minHeight={`500px`}>
                <TopField title={'説明'}>
                  <Area
                    width={'100%'}
                    height={'400px'}
                    padding={'1em 0.5em'}
                    background={theme.color.base}
                    border={{ radius: '6px' }}
                    defaultValue={props.calendar.description}
                    onChange={(e) => (props.calendar.description = e.target.value)}
                  />
                </TopField>
              </FlexBox>
            </ColorBox>



          </ColorBox>
        </ColorBox>
      </BorderBox>
    </CalendarEditorBox>
  )
}

const CalendarEditorBox = styled.div<{ background: string }>`
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
