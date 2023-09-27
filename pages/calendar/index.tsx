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
import jaLocale from '@fullcalendar/core/locales/ja' 
import { ReactElement} from 'react'
import { EventContentArg } from '@fullcalendar/core'
import interactionPlugin　from '@fullcalendar/interaction';
import { getDateTextNullable } from 'shared/utils/date'
import Tooltip from '@mui/material/Tooltip'
import { Button, Stack, Typography } from '@mui/material'

import { Link } from 'shared/elements/link/Link'

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

  const EventComponent = (arg: EventContentArg) => (

    <Tooltip
      arrow
      placement="right"
      title={
          <CustomToolTip 
          timeText={arg.timeText}
          event={arg.event} />
        }
      >
      <div
        style={{
          height: '100%',
          width: '100%',
        }}>
        <b>{arg.timeText}</b>
        <i>{arg.event.title}</i>
      </div>
    </Tooltip>
	);

  const CustomToolTip = ({timeText, event} :{timeText:string, event:EventContentArg["event"]}): ReactElement => {
    const start = getDateTextNullable(event.start);
    const end = getDateTextNullable(event.end);
    return (
      <Stack>
        <Typography variant="subtitle1">{event.title}</Typography>
        {
          start === end ? (
            <div>{start}</div>

          ):(
            <div>{start}-{end}</div>

          )
        }
        <div>{timeText}</div>
        <Link href={`/calendar/${event.id}`}><Button variant="contained" >編集</Button></Link>
      </Stack>
    );
  };

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

                plugins={[dayGridPlugin,interactionPlugin]}
                initialView="dayGridMonth"
                events={calendarList}
                eventColor={'#378006'}
                eventDisplay={'block'}
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
                selectable={true}
                unselectAuto={true}
                eventContent={(arg: EventContentArg) => EventComponent(arg)}
              />
            </Box>
          </FlexBox>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
