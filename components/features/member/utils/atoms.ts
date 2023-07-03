import { atom } from 'recoil'

// state
export const memberImageUploadState = atom<{
  name: string
  url: string
}>({
  key: 'memberImageUpload',
  default: {
    name: '',
    url: ''
  }
})

export const memberPreviewState = atom<boolean>({
  key: 'memberPreview',
  default: false
})
