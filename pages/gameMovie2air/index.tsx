import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { GameMovie2airHomeHeader } from 'components/features/gameMovie2air/elements/gameMovie2air-home-header'
import { GameMovie2airListItem } from 'components/features/gameMovie2air/elements/gameMovie2air-list-item'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { Category } from 'category/types/category'
import { FramerBox } from 'shared/elements/box/framer'
import { findInArray } from 'shared/utils/object'
import { GameMovie2air } from 'components/features/gameMovie2air/types/gameMovie2air'

const Home: NextPage = () => {
  const { data: gameMovie2airs } = useFireStore<GameMovie2air>('gameMovie2air')
  const { data: categories } = useFireStore<Category>('category')

  if (!gameMovie2airs || !categories) return <></>

  gameMovie2airs.sort((a, b) => {
    if (a.releaseDate.seconds !== b.releaseDate.seconds)
      return b.releaseDate.seconds - a.releaseDate.seconds
    return b.insDate.seconds - a.insDate.seconds
  })

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <GameMovie2airHomeHeader />
          <Box
            width={'100%'}
            position={'relative'}
            overflowY={'scroll'}
            grow={'9999'}
          >
            <FlexBox
              position={'absolute'}
              width={'100%'}
              way={'row'}
              gap={'1em'}
              wrap={'wrap'}
              padding={'2em 0'}
            >
              {gameMovie2airs.map((p: GameMovie2air) => (
                <GameMovie2airListItem
                  key={p.id}
                  gameMovie2air={p}
                  category={findInArray(categories, (c) => c.id === p.category)}
                />
              ))}
            </FlexBox>
          </Box>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
