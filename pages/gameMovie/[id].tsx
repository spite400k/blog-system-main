import { Category } from 'components/category/types/category'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { useRouter } from 'next/router'
import { GameMovieEditor } from 'components/gameMovie/elements/gameMovie-editor'
import { GameMovieEditorHeader } from 'components/gameMovie/elements/gameMovie-editor-header'
import { GameMovieEditorSidebar } from 'components/gameMovie/elements/gameMovie-editor-sidebar'
import { GameMovie } from 'components/gameMovie/types/gameMovie'
import { useState } from 'react'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'

export const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const [isPreview, setPreviewMode] = useState(false)
  const { data: gameMovie } = useFireStore<GameMovie>('gameMovie', id as string)
  const { data: categories } = useFireStore<Category>('category')

  if (!gameMovie || !categories) return <></>
  if (gameMovie.length === 0) return <></>

  return (
    <FramerBox>
      <FlexBox width={'100%'} height={'100vh'} way={'column'}>
        <GameMovieEditorHeader gameMovie={gameMovie[0]} />
        <FlexBox
          padding={'0 3em 0 3em'}
          width={'100%'}
          way={'row'}
          grow={'9999'}
        >
          <Box width={'100%'} height={'100%'} padding={'1em 3em 1em 0'}>
            <GameMovieEditor gameMovie={gameMovie[0]} isPreview={isPreview} />
          </Box>
          <Box height={'100%'} padding={'1em 0'}>
            <GameMovieEditorSidebar
              gameMovie={gameMovie[0]}
              categories={categories}
              isPreview={isPreview}
              onSetPreviewMode={(s) => setPreviewMode(s)}
            />
          </Box>
        </FlexBox>
      </FlexBox>
    </FramerBox>
  )
}

export default Page
