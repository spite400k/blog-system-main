import { UserIcon } from 'components/features/user/elements/user-icon'
import { ColorBox } from 'shared/elements/box/color'
import { FlexBox } from 'shared/elements/box/flex'
import { IconLink } from 'shared/elements/link/icon'
import { useTheme } from 'shared/hooks/useTheme'

export const TayoriMenu = () => {
  const { theme } = useTheme()
  return (
    <ColorBox background={theme.color.base} height={'100%'}>
      <FlexBox
        height={'100%'}
        way={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'2em 1em'}
      >
        <FlexBox way={'column'} gap={'1em'} grow={'9999'}>
          <IconLink
            width={'48px'}
            height={'48px'}
            background={theme.color.gray06}
            src={'write.svg'}
            href={'/post'}
          />
        </FlexBox>
        <FlexBox way={'column'} gap={'1em'} grow={'9999'}>
          <IconLink
            width={'48px'}
            height={'48px'}
            background={theme.color.gray06}
            src={'/img/member/Soccer_player_dribbling_silhouette.svg'}
            href={'/member'}
          />
        </FlexBox>
        <FlexBox way={'column'} gap={'1em'} grow={'9999'}>
          <IconLink
            width={'48px'}
            height={'48px'}
            background={theme.color.gray06}
            src={'movie.svg'}
            href={'/gameMovie'}
          />
        </FlexBox>
        <FlexBox way={'column'} gap={'1em'}>
          <IconLink
            width={'48px'}
            height={'48px'}
            background={theme.color.gray06}
            src={'setting.svg'}
            href={'/settings'}
          />
          <UserIcon />
        </FlexBox>
      </FlexBox>
    </ColorBox>
  )
}
