import { atom } from 'recoil'

// state
export const gameMovie2airImageUploadState = atom<{
  name: string
  url: string
}>({
  key: 'gameMovie2airImageUpload',
  default: {
    name: '',
    url: ''
  }
})

export const gameMovie2airPreviewState = atom<boolean>({
  key: 'gameMovie2airPreview',
  default: false
})
