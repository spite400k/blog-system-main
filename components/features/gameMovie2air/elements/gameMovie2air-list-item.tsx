import { GameMovie2air } from '../types/gameMovie2air'
import { BorderBox } from 'shared/elements/box/border'
import { ColorBox } from 'shared/elements/box/color'
import { Box } from 'shared/elements/box/common'
import { FlexBox } from 'shared/elements/box/flex'
import { Image } from 'shared/elements/image/common'
import { Link } from 'shared/elements/link/Link'
import { Word } from 'shared/elements/text/common'
import { useTheme } from 'shared/hooks/useTheme'
import { moduler } from 'shared/utils/styles'
import { getDateText, getTimeText } from 'shared/utils/date'
import { Category } from 'category/types/category'

export const GameMovie2airListItem = (props: {
  gameMovie2air: GameMovie2air
  category: Category | null
}) => {
  const { theme } = useTheme()

  return (
    <Link href={`/gameMovie2air/${props.gameMovie2air.id}`} width={'100%'}>
      <ColorBox background={theme.color.base} radius={'12px'}>
        <BorderBox
          width={'100%'}
          height={'100%'}
          borderPosition={'all'}
          borderColor={theme.color.gray05}
          borderWidth={'2px'}
          borderStyle={'solid'}
          radius={'12px'}
          overflow={'hidden'}
        >
          <FlexBox
            way={'row'}
            width={'100%'}
            minWidth={'30vw'}
            padding={'1em'}
            alignItems={'center'}
            gap={'1em'}
          >
            <BorderBox
              width={'60px'}
              height={'60px'}
              radius={'30px'}
              shrink={'0'}
              overflow={'hidden'}
              borderPosition="all"
              borderWidth="2px"
              borderColor={theme.color.main}
              borderStyle={'solid'}
            >
              <Image
                width="56px"
                height="56px"
                fit={'cover'}
                src={
                  props.gameMovie2air.thumbnail
                    ? props.gameMovie2air.thumbnail.url
                    : '/dog.png'
                }
              />
            </BorderBox>
            <FlexBox way={'column'} width={'100%'}>
              <FlexBox
                way={'row'}
                width={'100%'}
                justifyContent={'space-between'}
              >
                <Word
                  size={moduler(0)}
                  weight={'bold'}
                  color={theme.color.main}
                >
                  {props.gameMovie2air.title}
                </Word>
                <BorderBox
                  borderPosition="all"
                  borderWidth="2px"
                  borderColor={theme.color.main}
                  borderStyle={'solid'}
                  radius={'6px'}
                  overflow={'hidden'}
                >
                  <ColorBox padding={'4px 1em'} background={theme.color.base}>
                    <Word
                      size={moduler(-2)}
                      weight={'bold'}
                      color={theme.color.main}
                    >
                      {props.category !== null
                        ? props.category.name
                        : 'カテゴリーなし'}
                    </Word>
                  </ColorBox>
                </BorderBox>
              </FlexBox>
              <FlexBox way={'row'} gap={'1em'} alignItems={'center'}>
                <Word
                  size={moduler(-2)}
                  weight={'bold'}
                  color={theme.color.gray03}
                >
                  公開日
                </Word>
                <FlexBox way={'row'} gap={'6px'} alignItems={'center'}>
                  <GameMovie2airListStateMaker gameMovie2air={props.gameMovie2air} />
                  <Word
                    size={moduler(-1.5)}
                    weight={'500'}
                    color={theme.color.main}
                  >
                    {getDateText(props.gameMovie2air.releaseDate.toDate())}{' '}
                    {getTimeText(props.gameMovie2air.releaseDate.toDate())}
                  </Word>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </BorderBox>
      </ColorBox>
    </Link>
  )
}

export const _GameMovie2airListItem = (props: { gameMovie2air: GameMovie2air }) => {
  const { theme } = useTheme()
  return (
    <Link href={`/gameMovie2air/${props.gameMovie2air.id}`}>
      <BorderBox
        width={'320px'}
        height={'240px'}
        position={'relative'}
        radius={'42px 0 0 0px'}
        overflow={'hidden'}
        borderPosition={'all'}
        borderWidth={'3px'}
        borderStyle={'solid'}
        borderColor={theme.color.main}
      >
        <FlexBox
          width={'100%'}
          height={'100%'}
          position={'relative'}
          way={'column'}
          justifyContent={'flex-end'}
          overflow={'hidden'}
        >
          <Box position={'absolute'} width={'100%'} height={'100%'}>
            <Image
              width={'100%'}
              height={'100%'}
              src={'/frame.jpg'}
              fit={'cover'}
            />
          </Box>
          <Box width={'100%'} padding={'1em'} zIndex={'1'}>
            <BorderBox
              width={'100%'}
              radius={'8px'}
              overflow={'hidden'}
              borderPosition={'all'}
              borderWidth={'2px'}
              borderStyle={'solid'}
              borderColor={theme.color.gray06}
            >
              <ColorBox background={theme.color.base} padding={'1em'}>
                <FlexBox way={'column'} gap={'1em'}>
                  <Word
                    size={moduler(-1.5)}
                    weight={'bold'}
                    color={theme.color.main}
                  >
                    {props.gameMovie2air.title}
                  </Word>
                  <FlexBox way={'column'}>
                    <Word
                      size={moduler(-3)}
                      weight={'bold'}
                      color={theme.color.gray03}
                    >
                      公開日: 2022-12-12 10:00
                    </Word>
                  </FlexBox>
                </FlexBox>
              </ColorBox>
            </BorderBox>
          </Box>
        </FlexBox>
      </BorderBox>
    </Link>
  )
}

const GameMovie2airListStateMaker = (props: { gameMovie2air: GameMovie2air }) => {
  const now = new Date()
  const isReleased =
    props.gameMovie2air.releaseDate.toDate() < now && props.gameMovie2air.publish
  const color = isReleased ? '#3DD93D' : '#AFAEB4'
  return (
    <span
      style={{
        background: color,
        width: '12px',
        height: '12px',
        borderRadius: '6px'
      }}
    ></span>
  )
}
