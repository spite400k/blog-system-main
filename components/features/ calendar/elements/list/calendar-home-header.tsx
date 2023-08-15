import { useRouter } from 'next/router'
import { createCalendar } from '../../utils/create'
import { Button } from 'shared/elements/button/common'
import { Header } from 'shared/elements/header/header'

export const CalendarHomeHeader = () => {
  const router = useRouter()
  return (
    <Header name={'月間カレンダー'} subName={' CALENDAR'}>
      <Button
        onClick={() => {
          createCalendar().then((p) => {
            if (process.env.NODE_ENV === 'development') console.log(p)
            if (p) router.push(`/calendar/${p.id}`)
          })
        }}
      >
        Add New
      </Button>
    </Header>
  )
}
