import React, { useState } from 'react'
// import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { upload } from 'components/storage/utils/upload'

export type Props = {
  images: File | null
}

export const UploadMulti: React.FC<Props> = (props) => {
  const [isCommentSending, setIsCommentSending] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const maxImagesUpload = 10 // 画像を最大4枚まで選択・アップロード
  const [commentText, setCommentText] = useState<string>('')
  const inputId = Math.random().toString(32).substring(2)

  const handleOnSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    setIsCommentSending(true)

    const target = e.target as typeof e.target & {
      comment: { value: string }
    }

    const data = new FormData()
    images.map((image) => {
      return data.append('images[]', image)
    })
    data.append('comment', target.comment?.value || '')
    // const postedImage = await axios.post('/api/v1/comments', data)
    images.map(async (image) => {
      await upload('image', image)
    })

    // const postedImage = await upload('image', images)

    setIsCommentSending(false)
  }

  const handleOnAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    setImages([...images, ...e.target.files])
  }

  const handleOnRemoveImage = (index: number) => {
    // 選択した画像は削除可能
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <form action="" onSubmit={(e) => handleOnSubmit(e)}>
      <TextField
        name="comment"
        value={commentText}
        multiline
        minRows={1}
        maxRows={20}
        placeholder="コメントを書く"
        fullWidth
        variant="standard"
        disabled={isCommentSending}
        onChange={(e) => setCommentText(e.target.value)}
      />
      {/* 1つのボタンで画像を選択する */}
      <label htmlFor={inputId}>
        <Button
          variant="contained"
          disabled={images.length >= maxImagesUpload}
          component="span"
        >
          画像追加
        </Button>
        <input
          id={inputId}
          type="file"
          multiple
          accept="image/*,.png,.jpg,.jpeg,.gif"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnAddImage(e)
          }
          style={{ display: 'none' }}
        />
      </label>
      {/* 画像を選択したら選択中のすべての画像のプレビューを表示 */}
      {images.map((image, i) => (
        <div
          key={i}
          style={{
            position: 'relative',
            width: '40%'
          }}
        >
          <IconButton
            aria-label="delete image"
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              color: '#aaa'
            }}
            onClick={() => handleOnRemoveImage(i)}
          >
            <CancelIcon />
          </IconButton>
          <img
            src={URL.createObjectURL(image)}
            style={{
              width: '100%'
            }}
          />
        </div>
      ))}
      <br />
      <br />
      {isCommentSending ? (
        <CircularProgress />
      ) : (
        <Button
          variant="contained"
          type="submit"
          disableElevation
          disabled={!commentText}
        >
          投稿
        </Button>
      )}
    </form>
  )
}

// export default CommentForm;
