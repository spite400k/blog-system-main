import { useRouter } from 'next/router'
import { createMember } from '../../utils/create'
import { Button } from 'shared/elements/button/common'
import { Header } from 'shared/elements/header/header'

export const MemberHomeHeader = () => {
  const router = useRouter()
  return (
    <Header name={'選手紹介'} subName={'MEMBER'}>
      <Button
        onClick={() => {
          createMember().then((p) => {
            if (process.env.NODE_ENV === 'development') console.log(p)
            if (p) router.push(`/member/${p.id}`)
          })
        }}
      >
        Add New
      </Button>
    </Header>
  )
}
