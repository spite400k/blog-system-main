import { useTheme } from 'shared/hooks/useTheme'
import { BorderBox } from '../box/border'
import { ColorBox } from '../box/color'
import { FlexBox } from '../box/flex'
import TextareaAutosize from 'react-textarea-autosize'

export const AreaFlexisble = () => {
  const { theme } = useTheme()

  return (
    <FlexBox way={'column'} width={'100%'} gap={'6px'}>
      <ColorBox
        width={'100%'}
        background={theme.color.base}
        radius={'10px'}
        padding={'16px 8px'}
        hover={{
          background: theme.color.gray06
        }}
      >
        <BorderBox
          width={'100%'}
          borderPosition={'bottom'}
          borderWidth={'0px'}
          borderColor={theme.color.gray05}
          borderStyle={'solid'}
        >
          <FlexBox way={'row'} gap={'1em'} alignItems={'center'} width={'100%'}>
            <TextareaAutosize minRows={3} style={{ width: '100%' }} />
          </FlexBox>
        </BorderBox>
      </ColorBox>
    </FlexBox>
  )
}
