import { Category } from 'components/category/types/category'
import { useFireStore } from 'firestore/hooks/useFirestore'
import { useRouter } from 'next/router'
import { MemberEditor } from 'member/elements/detail/member-editor'
import { MemberEditorHeader } from 'member/elements/detail/member-editor-header'
import { MemberEditorSidebar } from 'member/elements/detail/member-editor-sidebar'
import { MemberType } from 'member/types/member'
import { useState } from 'react'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { FramerBox } from 'shared/elements/box/framer'

export const Page = () => {
  const router = useRouter()
  const { id } = router.query
  const [isPreview, setPreviewMode] = useState(false)
  const { data: member } = useFireStore<MemberType>('member', id as string)
  const { data: categories } = useFireStore<Category>('category')

  if (!member || !categories) return <></>
  if (member.length === 0) return <></>

  return (
    <FramerBox>
      <FlexBox width={'100%'} height={'1700px'} way={'column'}>
        <MemberEditorHeader member={member[0]} />
        <FlexBox
          padding={'0 3em 0 3em'}
          width={'100%'}
          way={'row'}
          grow={'9999'}
        >
          <Box width={'100%'} height={'100%'} padding={'1em 3em 1em 0'}>
            <MemberEditor member={member[0]} isPreview={isPreview} />
          </Box>
          <Box height={'100%'} padding={'1em 0'}>
            <MemberEditorSidebar
              member={member[0]}
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
