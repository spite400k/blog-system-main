import { useRouter } from 'next/router'
import { createGameMovie2air } from '../utils/create'
import { Button } from 'shared/elements/button/common'
import { Header } from 'shared/elements/header/header'

export const GameMovie2airHomeHeader = () => {
  const router = useRouter()
  return (
    <Header name={'試合映像の投稿'} subName={'POST'}>
      <Button
        onClick={() => {
          createGameMovie2air().then((p) => {
            // if (process.env.NODE_ENV === 'development') console.log(p)
            if (p) router.push(`/gameMovie2air/${p.id}`)
          })
        }}
      >
        Add New
      </Button>
    </Header>
  )
}
