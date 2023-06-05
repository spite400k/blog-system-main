import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { GameMovieHomeHeader } from 'components/gameMovie/elements/gameMovie-home-header'
import { GameMovieListItem } from 'components/gameMovie/elements/gameMovie-list-item'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { GameMovie } from 'components/gameMovie/types/gameMovie'
import { Category } from 'category/types/category'
import { FramerBox } from 'shared/elements/box/framer'
import { findInArray } from 'shared/utils/object'

const Home: NextPage = () => {
  const { data: gameMovies } = useFireStore<GameMovie>('gameMovie')
  const { data: categories } = useFireStore<Category>('category')

  if (!gameMovies || !categories) return <></>

  gameMovies.sort((a, b) => {
    if (a.releaseDate.seconds !== b.releaseDate.seconds)
      return b.releaseDate.seconds - a.releaseDate.seconds
    return b.insDate.seconds - a.insDate.seconds
  })

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <GameMovieHomeHeader />
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
              {gameMovies.map((p: GameMovie) => (
                <GameMovieListItem
                  key={p.id}
                  gameMovie={p}
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
