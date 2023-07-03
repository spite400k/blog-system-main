import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { MemberHomeHeader } from 'member/elements/list/member-home-header'
import { MemberListItem } from 'member/elements/list/member-list-item'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { Member } from 'member/types/member'
import { Category } from 'category/types/category'
import { FramerBox } from 'shared/elements/box/framer'
import { findInArray } from 'shared/utils/object'

const Home: NextPage = () => {
  const { data: members } = useFireStore<Member>('member')
  const { data: categories } = useFireStore<Category>('category')

  if (!members || !categories) return <></>

  members.sort((a, b) => {
    if (a.releaseDate.seconds !== b.releaseDate.seconds)
      return b.releaseDate.seconds - a.releaseDate.seconds
    return b.insDate.seconds - a.insDate.seconds
  })

  return (
    <FramerBox>
      <TayoriTemplate>
        <FlexBox way={'column'} width={'100%'} height={'100%'}>
          <MemberHomeHeader />
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
              {members.map((p: Member) => (
                <MemberListItem
                  key={p.id}
                  member={p}
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
