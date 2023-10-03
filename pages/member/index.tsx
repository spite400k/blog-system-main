import { TayoriTemplate } from 'components/tayori/elements/tayori-template'
import type { NextPage } from 'next'
import { MemberHomeHeader } from 'member/elements/list/member-home-header'
import { MemberListItem } from 'member/elements/list/member-list-item'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { MemberType } from 'member/types/member'
import { Category } from 'category/types/category'
import { FramerBox } from 'shared/elements/box/framer' 

const Home: NextPage = () => {
  const { data: MemberType s } = useFireStore<Member>('member')
  const { data: categories } = useFireStore<Category>('category')

  if (!members || !categories) return <></>

  const FWMembers:MemberType[] = [];
  const MDMembers:MemberType[] = [];
  const DFMembers:MemberType[] = [];
  const GKMembers:MemberType[] = [];
  const otherMembers:MemberType[] = [];
  
  members.forEach((member:MemberType) => {
    if(!member || member === undefined) return otherMembers.push(member);
    if(!member.position || member.position === undefined) return otherMembers.push(member);

    if(member.position.includes('FW')) return FWMembers.push(member);
    if(member.position.includes('DF')) return DFMembers.push(member);
    if(member.position.includes('MD')) return MDMembers.push(member);
    if(member.position.includes('GK')) return GKMembers.push(member);
    
    return otherMembers.push(member);
  })
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
            <Box
              width={'100%'}
              // position={'relative'}
              // overflowY={'scroll'}
              grow={'9999'}
            >
              <FlexBox
                // position={'absolute'}
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >FW
                {FWMembers.map((p: MemberType ) => (
                  <MemberListItem key={p.id} member={p} />
                ))}
              </FlexBox>
            </Box>
            <Box
              width={'100%'}
              // position={'relative'}
              // overflowY={'scroll'}
              grow={'9999'}
            >
              <FlexBox
                // position={'absolute'}
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >MD
                {MDMembers.map((p: MemberType ) => (
                  <MemberListItem key={p.id} member={p} />
                ))}
              </FlexBox>
            </Box>
            <Box
              width={'100%'}
              // position={'relative'}
              // overflowY={'scroll'}
              grow={'9999'}
            >
              <FlexBox
                // position={'absolute'}
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >DF
                {DFMembers.map((p: MemberType ) => (
                  <MemberListItem key={p.id} member={p} />
                ))}
              </FlexBox>
            </Box>
            <Box
              width={'100%'}
              // position={'relative'}
              // overflowY={'scroll'}
              grow={'9999'}
              >
              <FlexBox
                // position={'absolute'}
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >GK
                {GKMembers.map((p: MemberType ) => (
                  <MemberListItem key={p.id} member={p} />
                ))}
              </FlexBox>
            </Box>
            <Box
              width={'100%'}
              // position={'relative'}
              // overflowY={'scroll'}
              grow={'9999'}
            >
              <FlexBox
                // position={'absolute'}
                width={'100%'}
                way={'row'}
                gap={'1em'}
                wrap={'wrap'}
                padding={'2em 0'}
              >その他
                {otherMembers.map((p: MemberType ) => (
                  <MemberListItem key={p.id} member={p} />
                ))}
              </FlexBox>
            </Box>
          </Box>
        </FlexBox>
      </TayoriTemplate>
    </FramerBox>
  )
}

export default Home
