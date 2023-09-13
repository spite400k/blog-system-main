import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { FramerBox } from 'shared/elements/box/framer'
import { CalendarType } from 'components/features/ calendar/types/calendar'
import { CalendarHomeHeader } from 'components/features/ calendar/elements/list/calendar-home-header'
import { CalendarListItem } from 'components/features/ calendar/elements/list/calendar-list-item'
import FullCalendar from '@fullcalendar/react'
// FullCalendarで月表示を可能にするプラグイン。
import dayGridPlugin from '@fullcalendar/daygrid'
// 日本語対応のためのインポート
import jaLocale from '@fullcalendar/core/locales/ja' // 追加
import { Tooltip } from 'shared/elements/tooltips'
import { aa } from '@fullcalendar/core/internal-common'

// import { ToolTip } from "shared/elements/tooltips";

const Home: NextPage = () => {
  const { data: calendars } = useFireStore<CalendarType>('tbl_calendar')

  if (!calendars) return <></>

  calendars.sort((a, b) => {
    if (a.releaseDate.seconds !== b.releaseDate.seconds)
      return b.releaseDate.seconds - a.releaseDate.seconds
    return b.insDate.seconds - a.insDate.seconds
  })

  const calendarList = calendars.map((calendar) => {
    const startDate = new Date(
      new Date(calendar.start.seconds * 1000).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      })
    )
    const endDate = new Date(
      new Date(calendar.end.seconds * 1000).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric'
      })
    )

    return {
      id: calendar.id,
      title: calendar.title,
      start: startDate,
      end: endDate,
      description: calendar.description,
      backgroundColor: calendar.backgroundColor,
      borderColor: calendar.borderColor
    }
  })

  const EventComponent = (arg: aa) => (
    <Tooltip message={arg.event.title}>
      <div>{arg.event.title}</div>
    </Tooltip>
  )

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <CalendarHomeHeader />
          <FlexBox way={'row'} width={'100%'} height={'100%'} gap={'2em'}>
            <Box width={'30%'} overflowY={'scroll'}>
              <FlexBox
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >
                {calendars.map((p: CalendarType) => (
                  <CalendarListItem key={p.id} calendar={p} />
                ))}
              </FlexBox>
            </Box>

            <Box width={'70%'} overflowY={'scroll'}>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={calendarList}
                locales={[jaLocale]}
                locale="ja"
                headerToolbar={{
                  start: 'prev,today,next dayGridMonth,dayGridWeek,dayGridDay',
                  center: 'title',
                  end: ''
                }}
                businessHours={true}
                height={'auto'}
                dayMaxEventRows={2}
                expandRows={true}
                aspectRatio={1.0}
                // dateClick={handleDateClick}
                eventClick={(e) => {
                  //   alert('Event: ' + info.event.title + '¥r¥n'+'Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY + '¥r¥n'+'View: ' + info.view.type);

                  //   // change the border color just for fun
                  //   info.el.style.borderColor = 'red';
                  //   return(
                  //     <>aaa</>
                  //   )
                  // }
                  // console.log(e)
                  return (
                    <Tooltip message={'ツールチップ'}>
                      <h1>e</h1>
                      <h1>e.el.extendedProps.description</h1>
                    </Tooltip>
                  )
                }}
                // eventDidMount={(e) => {
                //   console.log(e)
                //   return (
                //     <Tooltip label="Tooltip text">
                //       <h1>e.event.title</h1>
                //       <h1>e.el.extendedProps.description</h1>
                //     </Tooltip>
                //   )
                // }}
                // eventContent={(arg) => EventComponent(arg)}
              />
            </Box>
          </FlexBox>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
