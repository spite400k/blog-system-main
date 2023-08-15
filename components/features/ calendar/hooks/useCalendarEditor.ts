
import { useRecoilState } from 'recoil'
// import { useNotification } from 'components/notification/hooks/useNotification'
import { calendarPreviewState } from '../utils/atoms'

export const useCalendarEditor = () => {
  const [isPreview, setPreviewMode] = useRecoilState(calendarPreviewState)
  // const notifier = useNotification()

  const onTogglePreview = () => {
    setPreviewMode(!isPreview)
  }


  return {
    isPreview,
    onTogglePreview,
  }
}
