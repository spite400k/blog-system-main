import { atom } from 'recoil'


export const calendarPreviewState = atom<boolean>({
  key: 'calendarPreview',
  default: false
})
