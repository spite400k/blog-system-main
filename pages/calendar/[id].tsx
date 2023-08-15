import { CalendarEditor } from 'components/features/ calendar/elements/detail/calendar-editor'
import { CalendarEditorHeader } from 'components/features/ calendar/elements/detail/calendar-editor-header'
import { CalendarEditorSidebar } from 'components/features/ calendar/elements/detail/calendar-editor-sidebar'
import { CalendarType } from 'components/features/ calendar/types/calendar'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'

export const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const [isPreview, setPreviewMode] = useState(false)
  const { data: calendar } = useFireStore<CalendarType>('tbl_calendar', id as string)

  if (!calendar) return <></>
  if (calendar.length === 0) return <></>

  return (
    <FramerBox>
      <FlexBox width={'100%'} height={'100vh'} way={'column'}>
        <CalendarEditorHeader calendar={calendar[0]} />
        <FlexBox
          padding={'0 3em 0 3em'}
          width={'100%'}
          way={'row'}
          grow={'9999'}
        >
          <Box width={'100%'} height={'100%'} padding={'1em 3em 1em 0'}>
            <CalendarEditor calendar={calendar[0]} isPreview={isPreview} />
          </Box>
          <Box height={'100%'} padding={'1em 0'}>
            <CalendarEditorSidebar
              calendar={calendar[0]}
              isPreview={isPreview}
              onSetPreviewMode={(s) => setPreviewMode(s)} 
              categories={[]}            />
          </Box>
        </FlexBox>
      </FlexBox>
    </FramerBox>
  )
}

export default Page
