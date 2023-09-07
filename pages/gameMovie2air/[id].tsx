import { Category } from 'components/category/types/category'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { useRouter } from 'next/router'
import { GameMovie2airEditor } from 'components/features/gameMovie2air/elements/gameMovie2air-editor'
import { GameMovie2airEditorHeader } from 'components/features/gameMovie2air/elements/gameMovie2air-editor-header'
import { GameMovie2airEditorSidebar } from 'components/features/gameMovie2air/elements/gameMovie2air-editor-sidebar'
import { useState } from 'react'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'
// import { GameMovie } from 'components/features/gameMovie/types/gameMovie'
import { GameMovie2air } from 'components/features/gameMovie2air/types/gameMovie2air'

export const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const [isPreview, setPreviewMode] = useState(false)
  const { data: gameMovie2air } = useFireStore<GameMovie2air>('gameMovie2air', id as string)
  const { data: categories } = useFireStore<Category>('category')

  if (!gameMovie2air || !categories) return <></>
  if (gameMovie2air.length === 0) return <></>

  return (
    <FramerBox>
      <FlexBox width={'100%'} height={'100vh'} way={'column'}>
        <GameMovie2airEditorHeader gameMovie2air={gameMovie2air[0]}/>
        <FlexBox
          padding={'0 3em 0 3em'}
          width={'100%'}
          way={'row'}
          grow={'9999'}
        >
          <Box width={'100%'} height={'100%'} padding={'1em 3em 1em 0'}>
            <GameMovie2airEditor gameMovie2air={gameMovie2air[0]} isPreview={isPreview} />
          </Box>
          <Box height={'100%'} padding={'1em 0'}>
            <GameMovie2airEditorSidebar
              gameMovie2air={gameMovie2air[0]}
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
