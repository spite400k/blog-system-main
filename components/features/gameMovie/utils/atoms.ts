import { atom } from 'recoil'

// state
export const gameMovieImageUploadState = atom<{
  name: string
  url: string
}>({
  key: 'gameMovieImageUpload',
  default: {
    name: '',
    url: ''
  }
})

export const gameMoviePreviewState = atom<boolean>({
  key: 'gameMoviePreview',
  default: false
})
