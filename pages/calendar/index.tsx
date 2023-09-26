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
// import { Tooltip } from 'shared/elements/tooltips'
import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useCallback } from 'react'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { getDateText, getDateTextNullable } from 'shared/utils/date'
import Tooltip from '@mui/material/Tooltip'
import { List, ListItem, Stack, Typography } from '@mui/material'

// import { aa } from '@fullcalendar/core/internal-common'

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

  // const EventComponent = (arg: aa) => (
  //   <Tooltip message={arg.event.title}>
  //     <div>{arg.event.title}</div>
  //   </Tooltip>
  // )

  const handleDateClick = useCallback((arg: DateClickArg) => {
		// alert(arg.dateStr);
    // alert('Clicked on: ' + arg.dateStr);
    // alert('Coordinates: ' + arg.jsEvent.pageX + ',' + arg.jsEvent.pageY);
    // alert('Current view: ' + arg.view.title);
    // change the day's background color just for fun
    // arg.dayEl.style.backgroundColor = 'red' ? arg.dayEl.style.backgroundColor = 'grey' : arg.dayEl.style.backgroundColor = 'red';
    // arg.dayEl.style.backgroundColor = 'red'
  }, [])

  const handleEventClick = useCallback((arg: EventClickArg) => {
    const start = getDateTextNullable(arg.event.start);
    const end = getDateTextNullable(arg.event.end);
    // alert('Event: ' + arg.event.title + start + end);
    // alert('Coordinates: ' + arg.jsEvent.pageX + ',' + arg.jsEvent.pageY);
    // alert('View: ' + arg.view.type);

    // change the border color just for fun
    // arg.el.style.borderColor = 'red';  
    // arg.el.style.backgroundColor = 'red'

    // return (
    //   <Tooltip message={arg.event.title}>
    //     <div>{arg.event.title}</div>
    //   </Tooltip>
    // )
  }, [])

  // function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined } }) {
  //   return (
  //     <>
  //       <b>{eventInfo.timeText}</b>
  //       <i>{eventInfo.event.title}</i>
  //       {/* <Tooltip message={'EVENT'}>
  //         <div>EVEBT1111</div>
  //       </Tooltip> */}
  //     </>
  //   )
  // }

  const EventComponent = (arg: EventContentArg) => (
		// <Tooltip
		// 	message={arg.event.extendedProps.description} //イベントの中身
		// 	aria-label="tooltip"
		// 	// placement="top-start"
		// 	// hasArrow
		// 	// arrowSize={5}
		// >
		// 	<div>{arg.event.title}</div>
		// </Tooltip>
    <Tooltip
      arrow
      placement="right"
      title={<CustomToolTip name={arg.event.extendedProps.description} />}>
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

  const CustomToolTip = ({ name }: any): ReactElement => {
    return (
      <Stack>
        <Typography variant="body1">{name}</Typography>
        <List>
          <ListItem>Category 1</ListItem>
          <ListItem>Category 2</ListItem>
          <ListItem>Category 3</ListItem>
          <ListItem>Category 4</ListItem>
        </List>
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
                // dateClick={handleDateClick}
                dateClick={handleDateClick}
                selectable={true}
                unselectAuto={true}
                // eventClick={(e) => {
                //   //   alert('Event: ' + info.event.title + '¥r¥n'+'Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY + '¥r¥n'+'View: ' + info.view.type);

                //   //   // change the border color just for fun
                //   //   info.el.style.borderColor = 'red';
                //   //   return(
                //   //     <>aaa</>
                //   //   )
                //   // }
                //   // console.log(e)
                //   return (
                //     <Tooltip message={'ツールチップ'}>
                //       <h1>e</h1>
                //       <h1>e.el.extendedProps.description</h1>
                //     </Tooltip>
                //   )
                // }}
                eventClick={handleEventClick}
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
                // eventContent={renderEventContent}
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
